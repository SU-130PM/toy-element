import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@toy-element/utils";
import components from "./component";
import "@toy-element/theme/index.css";

library.add(fas);

const install = makeInstaller(components);

export * from "@toy-element/components";
export default install;
