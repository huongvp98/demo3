import { Button, Table } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './style.scss';

function index(props) {
  const { listCart, deleteItem, addItem, loadCart } = props;
  useEffect(() => {
    loadCart();
  }, []);
  let data = listCart.map((item, index) => {
    return {
      key: item.id,
      col1: index + 1,
      col2: item.cart.avatar,
      col3: item.cart.name,

      col4: item,
      col5: item,
    };
  });
  return (
    <>
      <div className="cart-body">
        <Table
          columns={[
            {
              title: 'Ảnh Bìa',
              dataIndex: 'col2',
              key: '2',
              render: (avatar) => {
                return <img src={avatar} alt="" />;
              },
            },
            {
              title: 'Tên sách',
              dataIndex: 'col3',
              key: '3',
              render: (name) => {
                return <div className="book-name">{name}</div>;
              },
            },
            {
              title: 'Số lượng',
              dataIndex: 'col4',
              key: '4',
              width: 150,
              render: (item) => {
                return (
                  <div>
                    <Button onClick={() => addItem({ n: -1, item })}>
                      -
                    </Button>
                    <span className="amount">{item.amount}</span>
                    <Button onClick={() => addItem({ n: 1, item })}>
                      +
                    </Button>
                  </div>
                );
              },
            },
            {
              title: 'Sửa',
              dataIndex: 'col5',
              key: '5',
              render: (item) => {
                return (
                  <Button
                    type="danger"
                    onClick={() => deleteItem(item)}
                  >
                    Xóa
                  </Button>
                );
              },
            },
          ]}
          dataSource={data}
        ></Table>
        {/* <div>{productInCart}</div> */}
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    cart: { listCart, productInCart },
  } = state;
  return { listCart, productInCart };
};
const mapDispatchToProps = ({
  cart: { deleteItem, addItem, loadCart },
}) => ({
  deleteItem,
  addItem,
  loadCart,
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
