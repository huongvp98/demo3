import { toast } from 'react-toastify';
export default {
  showShort(message, type) {
    this.show(message, type, 3000);
  },
  showLong(message, type) {
    this.show(message, type, 6000);
  },
  show(message, type, duration) {
    if (duration !== 0 && !duration) duration = 3000;
    let _type = 'info';
    switch (type) {
      case 'warning':
      case 'info':
      case 'success':
      case 'danger':
        _type = type;
        break;
      default:
        break;
    }
    this.showWithTitle('SBook', message, _type, duration);
    // Toast.show({
    //     text: message,
    //     duration: 3000,
    //     type: _type
    // });
  },
  showWithTitle(message, description, type, duration) {
    let func = toast.success;
    switch (type) {
      case 'danger':
        func = toast.error;
        break;
      case 'info':
        func = toast.info;
        break;
      case 'warning':
        func = toast.warn;
        break;
      default:
        break;
    }
    func(description, {
      position: toast.POSITION.TOP_RIGHT,
    });
  },
};
