import { Button, Input, Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import './style.scss';

function index(props) {
  const { total } = props;
  const [pathname, setPathName] = useState(window.location.pathname);
  const history = useHistory();
  const changeKey = (e) => {
    history.push(e.key);
    setPathName(e.key);
  };
  return (
    <>
      <div className="header">
        <div className="header-top">
          <div className="row">
            <div className="col-sm-12 col-md-3 logo">
              <img
                src={require('@resources/images/home/Shopi-logo.png')}
              />
              <span>SBook</span>
            </div>
            <div className="col-sm-10 col-md-8 col-9 search-area">
              <div className="search-inner">
                <Input />
                <Button>Tìm kiếm</Button>
              </div>
              <div className="navigation-bar">
                <Menu
                  theme="dark"
                  mode="horizontal"
                  // defaultSelectedKeys={['1']}
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
              <div className="icon-header">
                <i className="fal fa-shopping-cart"></i>
                <div className="total-product">
                  {total ? total : 0}
                </div>
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
    cart: { total },
  } = state;
  return { total };
};
export default connect(mapStateToProps)(index);
