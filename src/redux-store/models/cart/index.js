import { Modal } from 'antd';
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
    addItem: (payload, state) => {
      let listCart = state.cart.listCart;
      let { n, item } = payload;

      let check = listCart.findIndex((item2) => item2.id === item.id);
      if (check === -1) {
        let copyItem = item;
        copyItem.soLuong = 1;
        listCart.push(copyItem);
      } else {
        listCart[check].soLuong += n;
      }
      let productInCart = 0;
      listCart.map((item) => (productInCart += item.soLuong));
      console.log(listCart);
      dispatch.cart.updateData({
        listCart: listCart,
        total: listCart.length,
        productInCart: productInCart,
      });
    },
    deleteItem: (payload, state) => {
      confirm({
        title: 'Xác nhận',
        okType: 'danger',
        okText: 'Xóa',
        cancelText: 'Hủy',
        content: `Bạn có muốn xóa ${payload.name} khỏi giỏ hàng?`,
        onOk() {
          let listCart = state.cart.listCart.filter((item) => {
            if (item.id === payload.id) {
              return false;
            } else {
              return true;
            }
          });
          dispatch.cart.updateData({
            listCart: listCart,
            total: listCart.length,
          });
        },
        onCancel() {},
      });
    },
  }),
};
