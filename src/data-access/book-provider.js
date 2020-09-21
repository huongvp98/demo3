import strings from '@resources/strings';
import Axios from 'axios';
export default {
  search(params = {}) {
    const { page, limit, type, name } = params;
    let url = strings.api.book;
    url += '?page=' + page;
    if (limit) {
      url += '&limit=' + limit;
    }
    if (type) {
      url += '&type=' + type;
    }
    if (name) {
      url += '&name=' + name;
    }
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
  getById(id) {
    let url = strings.api.book + '/' + id;
    return new Promise((resolve, reject) => {
      Axios.get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
