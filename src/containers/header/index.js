import { Button, Input, Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import './style.scss';

function index(props) {
  const {
    total,
    nameSearch,
    loadBook,
    updateData,
    timeRequest,
    listCart,
    loadCart,
  } = props;
  useEffect(() => {
    updateData({
      nameSearch: '',
    });
    loadCart();
  }, []);
  const [pathname, setPathName] = useState(window.location.pathname);
  const history = useHistory();
  const changeKey = (e) => {
    history.push(e.key);
    setPathName(e.key);
  };
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
                  onClick={(e) => changeKey(e)}
                >
                  <Menu.Item key="/">Home</Menu.Item>
                  <MenuItem key="/cart">Cart</MenuItem>
                  <Menu.Item key="/contact">Contact</Menu.Item>
                </Menu>
              </div>
            </div>
            <div className="col-sm-1 col-md-1 col-1 cart-header">
              <div className="icon-header" onClick={goToCart}>
                <i className="fal fa-shopping-cart"></i>
                <div className="total-product">{listCart.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const {
    book: { nameSearch, timeRequest },
    cart: { total, listCart },
  } = state;
  return { total, nameSearch, timeRequest, listCart };
};
const mapDispatchToProps = ({
  book: { loadBook, updateData },
  cart: { loadCart },
}) => ({
  loadBook,
  updateData,
  loadCart,
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
