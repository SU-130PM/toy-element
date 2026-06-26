import { vLoading } from "./directive.js";
import { Loading } from "./service.js";

export const ErLoading = {
  name: "ErLoading",
  install(app) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};

export default ErLoading;

export { vLoading, vLoading as ErLoadingDirective, Loading as ErLoadingService };
