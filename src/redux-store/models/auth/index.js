import userProvider from '@data-access/user-provider';
import { message } from 'antd';
import { HOST_AUTH } from '@utils/client-utils';
// import listPatients from '../listPatients';

export default {
  state: {
    auth: (() => {
      try {
        let auth = localStorage.getItem('auth');
        auth = JSON.parse(auth);
        return auth;
      } catch (error) {}
      return null;
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      // debugger;
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onLogin: ({ code, redirectURI }) => {
      return new Promise((resolve, reject) => {
        if (!redirectURI || !code) {
          message.error('Thông tin đăng nhập không chính xác');
          reject();
          return;
        }
        userProvider
          .login(redirectURI, code)
          .then((res) => {
            switch (res.code) {
              case 0:
                localStorage.setItem(
                  'auth',
                  JSON.stringify(res.data),
                );
                dispatch.auth.updateData({
                  auth: res.data,
                });
                message.success('Đăng nhập thành công');
                resolve(res.data);
                return;
              default:
                message.error(
                  res.message || 'Đăng nhập không thành công',
                );
                reject('Đăng nhập không thành công');
            }
          })
          .catch((e) => {
            reject(e);
            console.log(e);
          });
      });
    },
    onLogout: () => {
      localStorage.removeItem('auth');
      dispatch.auth.updateData({
        auth: null,
      });
      let redirect = `${HOST_AUTH}/auth/logout?redirect_uri=${window.location.origin}`;
      window.location.href = redirect;
    },
  }),
};
