const prefix = 'https://5f68053038ce8700163989ff.mockapi.io/api/v1/';

export default {
  api: {
    user: {
      login: '/api/phat-thuoc/v1/auth/sso-login',
      // login: '/auth/oauth/token',
    },
    book: prefix + 'booth',
    cart: prefix + 'cartItem',
  },
};
