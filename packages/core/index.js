import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faSpinner, faCircleInfo, faCheckCircle, faCircleExclamation, faCircleXmark, faXmark, faEye, faEyeSlash, faAngleDown, faQuestionCircle, faFileAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@su-130pm/utils";
import components from "./component.js";
import "@su-130pm/theme/index.css";

library.add(faSpinner, faAngleRight, faCircleInfo, faCheckCircle, faCircleExclamation, faCircleXmark, faXmark, faEye, faEyeSlash, faAngleDown, faQuestionCircle, faFileAlt, faTimesCircle);

const install = makeInstaller(components);

export * from "@su-130pm/components";
export default install;
