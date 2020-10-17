import Axios from 'axios';
var md5 = require('md5');
const url = 'http://10.0.0.93:2185/api/hr/v1/auth/login';
export default {
  login(matKhau, taiKhoan) {
    let object = {
      matKhau: md5(matKhau),
      taiKhoan,
    };
    return new Promise((resolve, reject) => {
      Axios.post(url, object)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => reject(e));
    });
  },
};
