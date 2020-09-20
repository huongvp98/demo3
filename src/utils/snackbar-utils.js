import { message } from "antd";
export default {
  showShort(message, type) {
    this.show(message, type, 3000);
  },
  showLong(message, type) {
    this.show(message, type, 6000);
  },
  show(message, type, duration) {
    if (duration != 0 && !duration) duration = 3000;
    let _type = "info";
    switch (type) {
      case "warning":
      case "info":
      case "success":
      case "danger":
        _type = type;
        break;
    }
    this.showWithTitle("iSofH Hrm", message, _type, duration);

    // Toast.show({
    //     text: message,
    //     duration: 3000,
    //     type: _type
    // });
  },
  showWithTitle(message, description, type, duration) {
    switch (type) {
      case "danger":
        message.error(description);
        break;
      case "info":
        message.info(description);
        break;
      case "warning":
        message.warn(description);
        break;
      case "success":
      case "default":
        message.success(description);
        break;
    }
  },
};
