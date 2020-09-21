import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Select } from 'antd';
import './style.scss';
import { connect } from 'react-redux';
const { Option } = Select;

function index(props) {
  const {
    listBook,
    type,
    updateData,
    addItem,
    loadBook,
    nameSearch,
  } = props;
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
                {listBook.map((item) => {
                  return (
                    <Card
                      key={item.id}
                      hoverable
                      cover={<img alt="" src={item.avatar} />}
                    >
                      <span className="title-book">{item.name}</span>
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
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    book: { listBook, type, nameSearch },
    cart: { listCart },
  } = state;
  return { listBook, type, listCart, nameSearch };
};
const mapDispatchToProps = ({
  book: { updateData, loadBook },
  cart: { addItem },
}) => ({
  updateData,
  addItem,
  loadBook,
});
export default connect(mapStateToProps, mapDispatchToProps)(index);
