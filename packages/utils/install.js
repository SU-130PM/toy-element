import { each } from "lodash-es";

// makeInstaller 的作用是什么？
// makeInstaller 用于生成 Vue 插件的 install 函数，它接收组件数组并返回一个 installer。在执行 app.use(UI) 时，Vue 会调用该 installer，并遍历组件列表，对每个组件执行 app.use(component)。由于组件通过 withInstall 添加了 install 方法，因此会内部调用 app.component(component.name, component) 完成全局注册。这样组件库既支持 app.use(UI) 的全量注册，也支持 app.use(Button) 的按需注册。

// 把组件数组转换成一个 Vue 插件安装函数。
export function makeInstaller(components) {
  return (app) => each(components, (c) => app.use(c));
}
// 整个流程是：
// app.use(ToyElement)
// ↓
// installer(app)
// ↓
// each(components)
// ↓
// app.use(ErButton)
// ↓
// ErButton.install(app)
// ↓
// app.component("ErButton", ErButton)
// ↓
// 模板可用：
// <ErButton />


// 为什么组件库要写 withInstall？
// Vue 的 app.use() 只能安装插件，而普通组件本身不是插件对象。组件库通常通过 withInstall 给组件对象动态添加 install 方法，使其符合 Vue 插件规范。这样既可以通过 app.use(Component) 按需注册组件，也可以通过插件入口统一安装整个组件库。

// 给组件对象添加 install 方法
export const withInstall = (component) => {
  component.install = (app) => {
    const name = component?.name;
    // 组件库 必须依赖 name 自动注册。
    app.component(name, component);
  };

  return component;
};
// 原组件：
// Button = {
//   name:"ErButton"
// }

// 经过 withInstall：
// Button = {
//   name:"ErButton",
//   install(app){
//      app.component("ErButton", Button)
//   }
// }
// 组件就变成了 插件对象。

// Vue 的 app.use() 是插件安装机制。
// 当调用 app.use(plugin) 时，Vue 会检测 plugin 是否包含 install 方法，如果存在则执行 plugin.install(app)。组件库通常通过 withInstall 给组件添加 install 方法，在 install 中调用 app.component 完成全局注册。多个组件可以通过 makeInstaller 组合成一个插件入口，从而支持全量安装与按需注册。