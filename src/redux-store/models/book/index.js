import bookProvider from '@data-access/book-provider';
export default {
  state: {
    listBook: [],
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
