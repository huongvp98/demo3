import strings from '@resources/strings';
import Axios from 'axios';
export default {
  search(param = {}) {
    let url = strings.api.cart;
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  createOrEdit(param, id) {
    let url = strings.api.cart;
    if (id) {
      url += '/' + id;
      return new Promise((resolve, reject) => {
        Axios.put(url, param)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        Axios.post(url, param)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  delete(id) {
    let url = strings.api.cart + '/' + id;
    return Axios.delete(url, id);
  },
};
