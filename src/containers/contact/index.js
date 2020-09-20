import React from 'react';
import './style.scss';

function index(props) {
  return (
    <>
      <div className="warp-contact">
        <div className="body-contact">
          <p>
            <img
              src="https://www.facebook.com/images/fb_icon_325x325.png"
              alt=""
            />{' '}
            :
            <a href="https://www.facebook.com/thuhuong.pham.98892">
              https://www.facebook.com/thuhuong.pham.98892
            </a>
          </p>

          <p>
            <img
              src="https://baocantho.com.vn/image/fckeditor/upload/2019/20190313/images/Gmail_Icon.png"
              alt=""
            />{' '}
            : huongvp98@gmail.com
          </p>
          <p>
            <img
              src="https://i.pinimg.com/originals/84/4e/8c/844e8cd4ab26c82286238471f0e5a901.png"
              alt=""
            />{' '}
            : 0363510582
          </p>
        </div>
      </div>
    </>
  );
}

export default index;
