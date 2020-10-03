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
      </div>
    </>
  );
}
