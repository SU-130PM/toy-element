import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const packagesDir = path.join(rootDir, "packages");
const rootReadme = path.join(rootDir, "README.md");

const packageBuildMap = {
  utils: ["index.js", "install.js"],
  theme: ["index.js", "index.css", "reset.css"],
  components: ["index.js", "Button", "Collapse", "Icon"],
  core: ["index.js", "component.js"],
};

const packageJsonCache = new Map();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function cleanDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  ensureDir(dirPath);
}

function getPackageJson(packageName) {
  if (!packageJsonCache.has(packageName)) {
    const filePath = path.join(packagesDir, packageName, "package.json");
    packageJsonCache.set(packageName, readJson(filePath));
  }

  return packageJsonCache.get(packageName);
}

function rewriteWorkspaceDeps(deps = {}) {
  const rewritten = {};

  for (const [depName, depVersion] of Object.entries(deps)) {
    if (!String(depVersion).startsWith("workspace:")) {
      rewritten[depName] = depVersion;
      continue;
    }

    const matchedPackageName = depName.split("/").pop();
    const referencedPackage = Array.from(packageJsonCache.values()).find(
      (pkg) => pkg.name === depName
    );

    if (referencedPackage) {
      rewritten[depName] = `^${referencedPackage.version}`;
      continue;
    }

    const fallbackPackage = getPackageJson(matchedPackageName);
    rewritten[depName] = `^${fallbackPackage.version}`;
  }

  return rewritten;
}

function buildPublishPackageJson(packageName) {
  const sourcePkg = getPackageJson(packageName);
  const publishPkg = {
    name: sourcePkg.name,
    version: sourcePkg.version,
    private: false,
    publishConfig: sourcePkg.publishConfig,
    type: sourcePkg.type,
    main: sourcePkg.main,
    module: sourcePkg.module,
    exports: sourcePkg.exports,
    sideEffects: sourcePkg.sideEffects,
  };

  if (sourcePkg.dependencies) {
    publishPkg.dependencies = rewriteWorkspaceDeps(sourcePkg.dependencies);
  }

  if (sourcePkg.peerDependencies) {
    publishPkg.peerDependencies = sourcePkg.peerDependencies;
  }

  return publishPkg;
}

function shouldSkipFile(fileName) {
  return /\.test\.[cm]?[jt]sx?$/.test(fileName);
}

function copyFiltered(sourcePath, targetPath) {
  const stat = fs.statSync(sourcePath);

  if (stat.isDirectory()) {
    ensureDir(targetPath);
    for (const entry of fs.readdirSync(sourcePath, { withFileTypes: true })) {
      if (shouldSkipFile(entry.name)) {
        continue;
      }

      copyFiltered(
        path.join(sourcePath, entry.name),
        path.join(targetPath, entry.name)
      );
    }
    return;
  }

  if (shouldSkipFile(path.basename(sourcePath))) {
    return;
  }

  ensureDir(path.dirname(targetPath));
  fs.copyFileSync(sourcePath, targetPath);
}

function copyPackageFiles(packageName) {
  const sourceRoot = path.join(packagesDir, packageName);
  const distRoot = path.join(sourceRoot, "dist");

  cleanDir(distRoot);

  for (const entry of packageBuildMap[packageName]) {
    copyFiltered(path.join(sourceRoot, entry), path.join(distRoot, entry));
  }

  if (fs.existsSync(rootReadme)) {
    fs.copyFileSync(rootReadme, path.join(distRoot, "README.md"));
  }

  writeJson(
    path.join(distRoot, "package.json"),
    buildPublishPackageJson(packageName)
  );
}

for (const packageName of Object.keys(packageBuildMap)) {
  getPackageJson(packageName);
}

for (const packageName of Object.keys(packageBuildMap)) {
  copyPackageFiles(packageName);
  console.log(`built ${packageName} -> packages/${packageName}/dist`);
}
