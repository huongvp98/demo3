import { client } from '@utils/client-utils';
import strings from '@strings';
export default {
  login(redirectURI, code) {
    let object = {
      code: code,
      redirectURI: redirectURI,
    };
    return new Promise((resolve, reject) => {
      client
        .post(strings.api.user.login, object)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
