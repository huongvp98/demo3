import { Button, Table } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Iframe from 'react-iframe';

function index(props) {
  const {
    listCart,
    loadCart,
    addItem,
    deleteItem,
    updateData,
    isPrint,
  } = props;
  useEffect(() => {
    loadCart();
  }, []);
  const priceFormat = (price) => {
    let priceString = price.toString() + ',';
    return priceString
      .replace(/(\d)(?=(\d{3})+,)/g, '$1.')
      .replace(',', '');
  };
  let data = listCart.map((item) => {
    return {
      key: item.id,
      col1: item.cart.avatar,
      col2: item.cart.name,
      col3: item.cart.price ? priceFormat(item.cart.price) : null,
      col4: item,
    };
  });
  const getMoney = () => {
    let sum = 0;
    listCart.map((item) => (sum += item.cart.price * item.amount));
    let sumTrans = priceFormat(sum);
    return sumTrans;
  };
  const onPrint = () => {
    updateData({
      isPrint: true,
    });
    setTimeout(() => {
      props.updateData({
        isPrint: false,
      });
    }, 1000);
  };
  return (
    <>
      <div className="cart-body">
        <Table
          columns={[
            {
              title: 'Ảnh Bìa',
              dataIndex: 'col1',
              key: '1',
              render: (avatar) => {
                return <img src={avatar} alt="" />;
              },
            },
            {
              title: 'Tên sách',
              dataIndex: 'col2',
              key: '2',
              render: (name) => {
                return <div className="book-name">{name}</div>;
              },
            },
            {
              title: 'Giá (VNĐ)',
              dataIndex: 'col3',
              key: '3',
            },
            {
              title: 'Số lượng',
              dataIndex: 'col4',
              key: '4',
              render: (item) => {
                return (
                  <div className="add-item">
                    <Button onClick={() => addItem({ n: 1, item })}>
                      <i className="fal fa-chevron-up"></i>
                    </Button>
                    <span className="amount">{item.amount}</span>
                    <Button onClick={() => addItem({ n: -1, item })}>
                      <i className="fal fa-chevron-down"></i>
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
        <div className="sum-money">
          <span>Tổng tiền: {getMoney()} VNĐ</span>
        </div>
        <div
          style={{
            textAlign: 'right',
            marginRight: 150,
            marginTop: 30,
          }}
          className="bill"
        >
          <Button type="primary" onClick={onPrint}>
            In hóa đơn
          </Button>
          {isPrint ? (
            <Iframe
              url={window.location.origin + '/print-bill'}
              width="0"
              height="0"
              id="myId"
              className="myPrint"
              display="block"
              position="relative"
            ></Iframe>
          ) : null}
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    cart: { listCart, isPrint },
  } = state;
  return { listCart: listCart || [], isPrint: isPrint || false };
};
const mapDispatchToProps = ({
  cart: { addItem, loadCart, deleteItem, updateData },
}) => ({ addItem, loadCart, deleteItem, updateData });
export default connect(mapStateToProps, mapDispatchToProps)(index);
