import MessageBox from "./methods.js";

export const ErMessageBox = MessageBox;

ErMessageBox.install = (app) => {
  app.config.globalProperties.$msgbox = MessageBox;
  app.config.globalProperties.$messageBox = MessageBox;
  app.config.globalProperties.$alert = MessageBox.alert;
  app.config.globalProperties.$confirm = MessageBox.confirm;
  app.config.globalProperties.$prompt = MessageBox.prompt;
};

export default ErMessageBox;
