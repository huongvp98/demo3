import snackbar from '@utils/snackbar-utils';
import userProvider from '@data-access/user-provider';
import CryptoJS from 'crypto-js';
export default {
  state: {
    auth: (() => {
      try {
        let auth = localStorage.getItem('auth');
        let decryptAuth = CryptoJS.AES.decrypt(
          auth,
          'secret key 123',
        );
        let decryptedData = JSON.parse(
          decryptAuth.toString(CryptoJS.enc.Utf8),
        );
        auth = decryptedData;
        return auth;
      } catch (error) { }
      return null;
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onLogin: (payload) => {
      const { taiKhoan, matKhau } = payload;
      return new Promise((resolve, reject) => {
        if (!matKhau || !taiKhoan) {
          snackbar.show('Thông tin tài khoản không đúng!', 'danger');
          return;
        }
        userProvider
          .login(matKhau, taiKhoan)
          .then((s) => {
            if (s.code === 0) {
              let auth = s.data;
              auth = CryptoJS.AES.encrypt(
                JSON.stringify(auth),
                'secret key 123',
              ).toString();
              localStorage.setItem('auth', auth);
              dispatch.auth.updateData({ auth: s.data });
              snackbar.show('Đăng nhập thành công!', 'success');
              resolve(s);
            } else {
              snackbar.show(
                s.message || 'Đăng nhập không thành công!',
                'danger',
              );
              reject();
            }
          })
          .catch((e) => {
            snackbar.show('Đăng nhập không thành công!', 'danger');
            reject(e);
          });
      });
    },
    onLogout: () => {
      dispatch.auth.updateData({
        auth: null,
      });
      //clientUtils.auth = null;
      localStorage.clear();
    },
  }),
};
