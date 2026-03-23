import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@su-130pm/utils";
import components from "./component.js";
import "@su-130pm/theme/index.css";

library.add(faSpinner, faAngleRight);

const install = makeInstaller(components);

export * from "@su-130pm/components";
export default install;
