import { Button, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

export default function index() {
  const listCart = useSelector((state) => state.cart.listCart);
  const dispatch = useDispatch();
  const loadCart = (payload) =>
    dispatch({ type: 'cart/loadCart', payload });
  const deleteItem = (payload) =>
    dispatch({ type: 'cart/loadCart', payload });
  const addItem = (payload) =>
    dispatch({ type: 'cart/addItem', payload });
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
                    <Button onClick={() => addItem({ n: -1, item })}>
                      <i className="fal fa-chevron-up"></i>
                    </Button>
                    <span className="amount">{item.amount}</span>
                    <Button onClick={() => addItem({ n: 1, item })}>
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
      </div>
    </>
  );
}
