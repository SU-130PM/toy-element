import DefaultTheme from "vitepress/theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleRight,
  faCheck,
  faCheckCircle,
  faCircleExclamation,
  faCircleInfo,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faFileAlt,
  faQuestionCircle,
  faSearch,
  faSpinner,
  faTrash,
  faXmark,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import "@vitepress-demo-preview/component/style.css";

import ErAlert from "../../../components/Alert/Alert.vue";
import ErButton from "../../../components/Button/Button.vue";
import ErButtonGroup from "../../../components/Button/ButtonGroup.vue";
import ErCollapse from "../../../components/Collapse/Collapse.vue";
import ErCollapseItem from "../../../components/Collapse/CollapseItem.vue";
import ErConfigProvider from "../../../components/ConfigProvider/ConfigProvider.vue";
import ErDropdown from "../../../components/Dropdown/Dropdown.vue";
import ErDropdownItem from "../../../components/Dropdown/DropdownItem.vue";
import ErForm from "../../../components/Form/Form.vue";
import ErFormItem from "../../../components/Form/FormItem.vue";
import ErIcon from "../../../components/Icon/Icon.vue";
import ErInput from "../../../components/Input/Input.vue";
import ErLoading from "../../../components/Loading/Loading.vue";
import { vLoading } from "../../../components/Loading/directive.js";
import ErPopconfirm from "../../../components/Popconfirm/Popconfirm.vue";
import ErSelect from "../../../components/Select/Select.vue";
import ErOption from "../../../components/Select/Option.vue";
import ErSwitch from "../../../components/Switch/Switch.vue";
import ErTooltip from "../../../components/Tooltip/Tooltip.vue";
import ErUpload from "../../../components/Upload/Upload.vue";
import "../../../theme/index.css";
import "./style.css";

library.add(
  faSearch, faCheck, faTrash, faSpinner, faAngleRight,
  faAngleDown, faCircleInfo, faCheckCircle, faCircleExclamation,
  faCircleXmark, faXmark, faEye, faEyeSlash, faQuestionCircle,
  faFileAlt, faTimesCircle
);

const theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("demo-preview", ElementPlusContainer);
    ctx.app.component("ErAlert", ErAlert);
    ctx.app.component("ErButton", ErButton);
    ctx.app.component("ErButtonGroup", ErButtonGroup);
    ctx.app.component("ErCollapse", ErCollapse);
    ctx.app.component("ErCollapseItem", ErCollapseItem);
    ctx.app.component("ErConfigProvider", ErConfigProvider);
    ctx.app.component("ErDropdown", ErDropdown);
    ctx.app.component("ErDropdownItem", ErDropdownItem);
    ctx.app.component("ErForm", ErForm);
    ctx.app.component("ErFormItem", ErFormItem);
    ctx.app.component("ErIcon", ErIcon);
    ctx.app.component("ErInput", ErInput);
    ctx.app.component("ErLoading", ErLoading);
    ctx.app.directive("loading", vLoading);
    ctx.app.component("ErPopconfirm", ErPopconfirm);
    ctx.app.component("ErSelect", ErSelect);
    ctx.app.component("ErOption", ErOption);
    ctx.app.component("ErSwitch", ErSwitch);
    ctx.app.component("ErTooltip", ErTooltip);
    ctx.app.component("ErUpload", ErUpload);
  },
};

export default theme;
