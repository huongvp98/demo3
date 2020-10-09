import React, { useEffect } from 'react';
import { Button, Card, Carousel, Drawer, Select } from 'antd';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;
export default function index() {
  const {
    visible,
    name,
    author,
    description,
    avatar,
    id,
    type,
  } = useSelector((state) => state.book);
  const listBook = useSelector((state) => state.book.listBook);
  const dispatch = useDispatch();
  const loadBook = () => dispatch({ type: 'book/loadBook' });
  const updateData = (payload) =>
    dispatch({ type: 'book/updateData', payload });
  const addItem = (payload) =>
    dispatch({ type: 'cart/addItem', payload });
  useEffect(() => {
    loadBook();
  }, []);
  const onAddItem = (n, payload) => {
    let item = {
      cart: payload,
      cartId: payload.id,
      amount: 0,
    };
    addItem({ n, item });
    updateData({ visible: false });
  };
  const showDetail = (item) => {
    updateData({
      visible: true,
      name: item.name,
      description: item.description,
      author: item.author,
      avatar: item.avatar,
      id: item.id,
    });
  };
  const priceFormat = (price) => {
    let priceString = price.toString() + ',';
    return priceString
      .replace(/(\d)(?=(\d{3})+,)/g, '$1.')
      .replace(',', '');
  };
  return (
    <>
      <div className="warp-home">
        <div className="body-home">
          <div className="body-content">
            <div className="slide-show">
              <div className="row">
                <div className="col-lg-8 col-12 slide-left">
                  <Carousel autoplay>
                    <img
                      src={require('@resources/images/home/slide1.jpg')}
                      alt=""
                    />
                    <img
                      src={require('@resources/images/home/slide2.jpg')}
                      alt=""
                    />
                    <img
                      src={require('@resources/images/home/slide3.jpg')}
                      alt=""
                    />
                  </Carousel>
                </div>
                <div className="col-lg-4 col-12 slide-right">
                  <img
                    src={require('@resources/images/home/sach1.jpg')}
                    alt=""
                  />
                  <img
                    src={require('@resources/images/home/sach2.jpg')}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="book-shop">
              <div className="filter-book">
                <span>Lọc theo</span>
                <Select
                  placeholder="Lọc theo loại sách"
                  onChange={(e) => {
                    updateData({ type: e });
                    loadBook();
                  }}
                  value={type}
                >
                  <Option value="">Tất cả</Option>
                  <Option value={1}>Sách văn học</Option>
                  <Option value={2}>Sách doanh nhân</Option>
                  <Option value={3}>Sách kỹ năng</Option>
                </Select>
              </div>
              <div className="list-box">
                {(listBook || []).map((item) => {
                  return (
                    <Card
                      key={item.id}
                      hoverable
                      cover={
                        <img
                          alt=""
                          src={item.avatar}
                          onClick={() => showDetail(item)}
                        />
                      }
                    >
                      <span
                        className="title-book"
                        onClick={() => showDetail(item)}
                      >
                        {item.name}
                      </span>
                      <span className="price">
                        {priceFormat(item.price)} VNĐ
                      </span>
                      <div className="button-add">
                        <Button onClick={() => onAddItem(1, item)}>
                          Add To Card
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={name}
        onClose={() => {
          updateData({ visible: false });
        }}
        placement="right"
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <div className="avata-detail">
          <img src={avatar} alt="" />
        </div>
        <div className="info-detail">
          <p className="title">Tác giả</p>
          <p>{author}</p>
        </div>
        <div className="info-detail">
          <p className="title">Mô tả</p>
          <p>{description}</p>
        </div>
        <div className="button-detail">
          <Button
            onClick={() => {
              updateData({ visible: false });
            }}
            style={{ marginRight: 8 }}
          >
            Close
          </Button>
          <Button
            onClick={() =>
              onAddItem(1, {
                id,
                name,
                type,
                author,
                description,
                avatar,
              })
            }
            type="primary"
          >
            Add To Cart
          </Button>
        </div>
      </Drawer>
    </>
  );
}
