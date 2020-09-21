import bookProvider from '@data-access/book-provider';
export default {
  state: {
    listBook: [
      // {
      //   id: 1,
      //   link:
      //     'https://sachxua.vn/wp-content/uploads/2020/01/tuoi-tho-du-doi-sach-van-hoc-vn.jpg',
      //   value: 1,
      //   name: 'Tuổi thơ dữ dội',
      // },
      // {
      //   id: 2,
      //   link:
      //     'https://vnwriter.net/wp-content/uploads/2017/11/sach-bill-gates-tham-vong-lon-lao.jpg',
      //   value: 2,
      //   name:
      //     'Tham vọng lớn lao và quá trình hình thành đế chế Microsoft',
      // },
      // {
      //   id: 3,
      //   value: 3,
      //   name: 'Đọc vị bất kỳ ai',
      //   link:
      //     'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdcUnkLp7UwjJp5crAsfmRwgUovJ-xE8nF5w&usqp=CAU',
      // },
      // {
      //   id: 4,
      //   link:
      //     'https://cf.shopee.vn/file/e68df16ab069154d4ef92c265d83c362',
      //   value: 1,
      //   name: 'Văn học Việt Nam',
      // },
      // {
      //   id: 5,
      //   link:
      //     'https://nld.mediacdn.vn/k:2016/bia-sach-1458918936219/sach-van-hoc-soi-dong-tro-lai.jpg',
      //   value: 1,
      //   name: 'Tôi thấy hoa vàng trên cỏ xanh',
      // },
      // {
      //   id: 6,
      //   value: 3,
      //   name: 'Đắc nhân tâm',
      //   link:
      //     'https://salt.tikicdn.com/cache/w1200/media/catalog/producttmp/87/ac/69/2dc271bbb10ba65659682d524346486d.jpg',
      // },
      // {
      //   id: 7,
      //   link:
      //     'https://downloadsach.com/wp-content/uploads/2018/01/sach-neu-chi-con-mot-ngay-de-song-206x300.jpg',
      //   value: 1,
      //   name: 'Nếu chỉ còn một ngày để sống',
      // },
      // {
      //   id: 8,
      //   link:
      //     'https://vnwriter.net/wp-content/uploads/2018/09/sach-song-mon-217x300.jpg',
      //   value: 1,
      //   name: 'Sống mòn',
      // },
      // {
      //   id: 9,
      //   link:
      //     'https://img.websosanh.vn/v10/users/review/images/0y9326ybla81n/de-men-phieu-luu-ky.jpg?compress=85',
      //   value: 1,
      //   name: 'Dế mèn phiêu lưu ký',
      // },
      // {
      //   id: 10,
      //   link:
      //     'https://freetuts.net/upload/review_homework/images/2019/09/26/148/toi-la-jack-ma.gif',
      //   value: 2,
      //   name: 'Tôi là Jack Ma',
      // },
      // {
      //   id: 11,
      //   link:
      //     'https://thirdtext.com/wp-content/uploads/2018/08/3.png',
      //   value: 1,
      //   name: 'Ông già và biển cả',
      // },
      // {
      //   id: 12,
      //   link:
      //     'https://newshop.vn/public/uploads/products/6328/ban-linh-doanh-nhan.jpg',
      //   value: 2,
      //   name: 'Bản lĩnh doanh nhân',
      // },
      // {
      //   id: 13,
      //   link:
      //     'https://static.ybox.vn/2017/6/28/be2855f2-5bd7-11e7-ac18-56c566ee3692.jpg',
      //   value: 3,
      //   name: 'Tôi tài giỏi bạn cũng thế',
      // },
      // {
      //   id: 14,
      //   value: 3,
      //   name: 'Đánh thức con người phi thường trong bạn',
      //   link:
      //     'https://toplist.vn/images/800px/danh-thuc-con-nguoi-phi-thuong-trong-ban-173080.jpg',
      // },
    ],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    loadBook: async (payload, state) => {
      let limit = state.book.limit || 1000;
      let page = state.book.page || 1;
      let type = state.book.type;
      let name = state.book.nameSearch;
      let res = await bookProvider.search({
        page,
        limit,
        type,
        name,
      });
      const { status, statusText, data } = res;
      if (status === 404 || status === 500) {
        throw new Error(statusText);
      }
      dispatch.book.updateData({
        listBook: data,
      });
    },
  }),
};
