import { Button, Input, Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './style.scss';

export default function index(props) {
  const dispatch = useDispatch();
  const { nameSearch, timeRequest } = useSelector(
    (state) => state.book,
  );
  const updateData = (payload) =>
    dispatch({ type: 'book/updateData', payload });
  const loadBook = (payload) =>
    dispatch({ type: 'book/loadBook', payload });
  const loadCart = (payload) =>
    dispatch({ type: 'cart/loadCart', payload });
  const productInCart = useSelector(
    (state) => state.cart.productInCart,
  );

  useEffect(() => {
    updateData({
      nameSearch: '',
    });
    loadCart();
  }, []);
  const [pathname, setPathName] = useState(window.location.pathname);
  const history = useHistory();

  const goToCart = () => {
    history.push('/cart');
  };

  const searchBook = (event) => {
    updateData({ nameSearch: event.target.value });
    if (timeRequest) {
      try {
        clearTimeout(timeRequest);
      } catch (error) {}
    }
    let data = setTimeout(() => {
      loadBook();
    }, 500);
    updateData({ timeRequest: data });
  };
  return (
    <>
      <div className="header">
        <div className="header-top">
          <div className="row">
            <div className="col-sm-12 col-md-3 logo">
              <img
                src={require('@resources/images/home/Shopi-logo.png')}
                alt=""
              />
              <span>SBook</span>
            </div>
            <div className="col-sm-10 col-md-8 col-9 search-area">
              <div className="search-inner">
                <Input
                  value={nameSearch}
                  onChange={(event) => {
                    searchBook(event);
                  }}
                />
                <Button>Tìm kiếm</Button>
              </div>
              <div className="navigation-bar">
                <Menu
                  theme="dark"
                  mode="horizontal"
                  selectedKeys={[pathname]}
                  onClick={(e) => setPathName(e.key)}
                >
                  <Menu.Item key="/">
                    <Link to="/">Home</Link>{' '}
                  </Menu.Item>
                  <MenuItem key="/cart">
                    <Link to="/cart">Cart</Link>
                  </MenuItem>
                  <Menu.Item key="/contact">
                    <Link to="/contact">Contact</Link>
                  </Menu.Item>
                </Menu>
              </div>
            </div>
            <div className="col-sm-1 col-md-1 col-1 cart-header">
              <div className="icon-header" onClick={goToCart}>
                <i className="fal fa-shopping-cart"></i>
                <div className="total-product">{productInCart}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
}
