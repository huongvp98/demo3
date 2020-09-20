import { Button, Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

function index(props) {
  const { listCart, deleteItem, addItem, productInCart } = props;
  let data = listCart.map((item, index) => {
    return {
      key: item.id,
      col1: index + 1,
      col2: item.link,
      col3: item.name,

      col4: item,
      col5: item,
    };
  });
  const changeAmount = ({ n, item }) => {
    if (n == -1 && item.soLuong == 1) {
      deleteItem(item);
    } else {
      addItem({ n, item });
    }
  };
  return (
    <>
      <div className="cart-body">
        <Table
          columns={[
            {
              title: 'Ảnh Bìa',
              dataIndex: 'col2',
              key: '2',
              render: (link) => {
                return <img src={link} />;
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
                    <Button
                      onClick={() => changeAmount({ n: -1, item })}
                    >
                      -
                    </Button>
                    <span className="amount">{item.soLuong}</span>
                    <Button
                      onClick={() => changeAmount({ n: 1, item })}
                    >
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
const mapDispatchToProps = ({ cart: { deleteItem, addItem } }) => ({
  deleteItem,
  addItem,
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
