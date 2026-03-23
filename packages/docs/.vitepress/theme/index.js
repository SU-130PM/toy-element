import DefaultTheme from "vitepress/theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faCheck,
  faSearch,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ErButton from "../../../components/Button/Button.vue";
import ErButtonGroup from "../../../components/Button/ButtonGroup.vue";
import ErCollapse from "../../../components/Collapse/Collapse.vue";
import ErCollapseItem from "../../../components/Collapse/CollapseItem.vue";
import ErIcon from "../../../components/Icon/Icon.vue";
import "../../../theme/index.css";
import "./style.css";

library.add(faSearch, faCheck, faTrash, faSpinner, faAngleRight);

const theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("ErButton", ErButton);
    ctx.app.component("ErButtonGroup", ErButtonGroup);
    ctx.app.component("ErCollapse", ErCollapse);
    ctx.app.component("ErCollapseItem", ErCollapseItem);
    ctx.app.component("ErIcon", ErIcon);
  },
};

export default theme;
