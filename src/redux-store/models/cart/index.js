import { Modal } from 'antd';
import cartProvider from '@data-access/cart-provider';
import snackbar from '@utils/snackbar-utils';
const { confirm } = Modal;
export default {
  state: {
    listCart: [],
    total: 0,
    productInCart: 0,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadCart: async (payload, state) => {
      let res = await cartProvider.search();
      const { status, statusText, data } = res;
      dispatch.cart.updateData({
        listCart: data,
      });
    },
    addItem: (payload, state) => {
      let listCart = state.cart.listCart;
      let { n, item } = payload;
      let id;
      let param = {
        cartId: item.id,
        cart: item,
      };
      let check = listCart.findIndex(
        (item2) => item2.cartId === item.id,
      );
      if (n === -1 && item.amount === 1) {
        dispatch.cart.deleteItem(item);
      } else {
        if (check === -1) {
          param.amount = 1;
        } else {
          param.amount = listCart[check].amount + n;
          id = listCart[check].id;
        }
      }

      return new Promise((resolve, reject) => {
        cartProvider
          .createOrEdit(param, id)
          .then((s) => {
            if (s && (s.status === 200 || s.status === 201)) {
              dispatch.cart.loadCart();
              resolve(s.data);
            } else if (s.status === 404) {
              snackbar.show(
                'Không tìm thấy kết quả phù hợp',
                'danger',
              );
              dispatch.book.loadBook();
              dispatch.loadCart.loadCart();
              reject();
            } else if (s.status === 500) {
              snackbar.show(
                s.statusText || 'Xảy ra lỗi vui lòng thử lại sau',
                'danger',
              );
              reject();
            } else {
              snackbar.show(
                s.statusText || 'Xảy ra lỗi vui lòng thử lại sau',
                'danger',
              );
              reject();
            }
          })
          .catch((e) => {
            snackbar.show(
              e || 'Xảy ra lỗi vui lòng thử lại sau!',
              'danger',
            );
            reject();
          });
      });
    },
    deleteItem: (payload, state) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: 'Xác nhận',
          okType: 'danger',
          okText: 'Xóa',
          cancelText: 'Hủy',
          content: `Bạn có muốn xóa ${payload.cart.name} khỏi giỏ hàng?`,
          onOk() {
            cartProvider
              .delete(payload.id)
              .then((s) => {
                debugger;
                if (s && (s.status === 200 || s.status === 201)) {
                  snackbar.show(
                    'Xóa sách ra khỏi giỏ hàng thành công',
                    'success',
                  );
                  dispatch.cart.loadCart();
                  resolve(s.data);
                } else {
                  snackbar.show(
                    'Xóa sách ra khỏi giỏ hàng thất bại',
                    'danger',
                  );
                  reject();
                }
              })
              .catch((e) => {
                snackbar.show(
                  e || 'Xóa sách ra khỏi giỏ hàng thất bại',
                  'danger',
                );
                reject();
              });
          },
          onCancel() {
            reject();
          },
        });
      });
    },
  }),
};
