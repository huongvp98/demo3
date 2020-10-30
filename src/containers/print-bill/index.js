import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { Table } from "antd"
function index(props) {
  const { listCart } = props
  useEffect(() => {
    props.loadCart()
      .then((s) => window.print());
  });
  const priceFormat = (price) => {
    let priceString = price.toString() + ',';
    return priceString
      .replace(/(\d)(?=(\d{3})+,)/g, '$1.')
      .replace(',', '');
  };
  let data = listCart.map((item) => {
    return {
      key: item.id,
      col1: item.cart.name,
      col2: item.cart.price ? priceFormat(item.cart.price) : null,
      col3: item.amount,
    };
  });
  const getMoney = () => {
    let sum = 0;
    listCart.map((item) => (sum += item.cart.price * item.amount));
    let sumTrans = priceFormat(sum);
    return sumTrans;
  };
  return (
    <div className="print-bill">
      <div className="title">HÓA ĐƠN</div>
      <Table
        columns={[
          {
            title: 'Tên sách',
            dataIndex: 'col1',
            key: '1',
            render: (name) => {
              return <div className="book-name">{name}</div>;
            },
          },
          {
            title: 'Giá (VNĐ)',
            dataIndex: 'col2',
            key: '2',
          },
          {
            title: 'Số lượng',
            dataIndex: 'col3',
            key: '3',
          },
        ]}
        dataSource={data}
      ></Table>
      <div className="sum-money">
        <span>Tổng tiền: {getMoney()} VNĐ</span>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const {
    cart: { listCart, isPrint },
  } = state;
  return { listCart: listCart || [], isPrint };
};
const mapDispatchToProps = ({ cart: { loadCart } }) => ({ loadCart });
export default connect(mapStateToProps, mapDispatchToProps)(index);
