import Message from "./methods.js";

export const ErMessage = Message;

ErMessage.install = (app) => {
  app.config.globalProperties.$message = Message;
};

export * from "./methods.js";
