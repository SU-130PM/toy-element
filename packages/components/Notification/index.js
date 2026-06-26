import Notification from "./methods.js";

export const ErNotification = Notification;

ErNotification.install = (app) => {
  app.config.globalProperties.$notify = Notification;
};

export * from "./methods.js";
