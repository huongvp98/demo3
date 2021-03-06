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
    loadCart: async (payload = {}, state) => {
      let res = await cartProvider.search();
      const { status, statusText, data } = res;
      if (status !== 200 && status !== 201) {
        snackbar.show(
          statusText || 'Đã xảy ra lỗi vui lòng thử lại sau!',
          'danger',
        );
        throw new Error();
      }
      dispatch.cart.updateData({
        listCart: data,
        productInCart: data.length,
      });
    },
    addItem: (payload = {}, state) => {
      let listCart = state.cart.listCart;
      let { n, item } = payload;
      let id;
      let check = listCart.findIndex(
        (item2) => item2.cartId === item.cartId,
      );
      if (n === -1 && item.amount === 1) {
        dispatch.cart.deleteItem(item);
        return;
      }
      if (check === -1) {
        item.amount = 1;
      } else {
        item.amount = listCart[check].amount + n;
        id = listCart[check].id;
      }
      return new Promise((resolve, reject) => {
        cartProvider
          .createOrEdit(item, id)
          .then((s) => {
            if (s && (s.status === 200 || s.status === 201)) {
              if (window.location.pathname === '/') {
                snackbar.show(
                  n === 1
                    ? 'Thêm sách vào giỏ hàng thành công'
                    : 'Bỏ sản phẩm ra khỏi giỏ hàng thành công!',
                  'success',
                );
              }
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
