import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@toy-element/utils";
import components from "./component.js";
import "@toy-element/theme/index.css";

library.add(faSpinner);

const install = makeInstaller(components);

export * from "@toy-element/components";
export default install;
