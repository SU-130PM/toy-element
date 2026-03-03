import DefaultTheme from "vitepress/theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faSearch,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ErButton from "../../../components/Button/Button.vue";
import ErButtonGroup from "../../../components/Button/ButtonGroup.vue";
import ErIcon from "../../../components/Icon/Icon.vue";
import "../../../theme/index.css";
import "./style.css";

library.add(faSearch, faCheck, faTrash, faSpinner);

const theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    ctx.app.component("ErButton", ErButton);
    ctx.app.component("ErButtonGroup", ErButtonGroup);
    ctx.app.component("ErIcon", ErIcon);
  },
};

export default theme;
