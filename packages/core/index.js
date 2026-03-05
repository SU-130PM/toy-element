import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@su-130pm/utils";
import components from "./component.js";
import "@su-130pm/theme/index.css";

library.add(faSpinner);

const install = makeInstaller(components);

export * from "@su-130pm/components";
export default install;


// 组件库入口文件是干嘛的？
// 入口文件主要负责组件库的初始化，包括注册第三方资源（例如 FontAwesome 图标）、加载全局样式、收集组件列表，并通过 makeInstaller 生成 Vue 插件 install 方法。同时通过 export * 导出所有组件，使用户既可以通过 app.use() 全量安装组件库，也可以按需引入单个组件。
