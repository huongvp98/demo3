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

// [
//   {
//     "id": "1",
//     "createdAt": "2020-09-21T00:00:35.093Z",
//     "name": "Tuổi thơ dữ dội",
//     "avatar": "https://sachxua.vn/wp-content/uploads/2020/01/tuoi-tho-du-doi-sach-van-hoc-vn.jpg",
//     "type": 1,
//     "author": "Phùng Quán",
//     "description": "'Tuổi thơ dữ dội' là một tác phẩm truyện dài tám phần của nhà văn Phùng Quán. Truyện được khởi thảo bên bờ Hồ Tây năm 1968 và hoàn thành trong lều cỏ giữa hồ Tịnh Tâm năm 1986. Cuốn truyện xoay quanh cuộc sống chiến đấu và sự hy sinh của những thiếu niên 13, 14 tuổi trong hàng ngũ Đội thiếu niên trinh sát của trung đoàn Trần Cao Vân. \n Cuốn truyện miêu tả súc tích quá trình tham gia chiến đấu và hy sinh ở tuổi đời rất trẻ của hơn ba mươi thiếu niên, tập trung quanh các nhân vật tiêu biểu là Lượm, Mừng, Quỳnh sơn ca và một loạt các nhân vật khác như: Tư dát, Bồng da rắn, Vịnh sưa,... \n Cuốn truyện có hệ thống nhân vật khá giống 'Những ngày khói lửa' và một vài truyện ngắn khác, khiến người đọc cảm giác là có nhiều tác phẩm khác nhau trong thời kỳ này cùng viết về một nhóm nhân vật có thật. \n Năm 1988, cuốn tiểu thuyết Tuổi thơ dữ dội của Phùng Quán được xuất bản và nhận Giải thưởng Văn học Thiếu nhi của Hội Nhà văn Việt Nam hai năm sau đó và đã được dựng thành phim."
//   },
//   {
//     "id": "2",
//     "createdAt": "2020-09-20T23:08:39.441Z",
//     "name": "Tham vọng lớn lao và quá trình hình thành đế chế Microsoft",
//     "avatar": "https://vnwriter.net/wp-content/uploads/2017/11/sach-bill-gates-tham-vong-lon-lao.jpg",
//     "type": 2,
//     "author": "James Wallace & Jim Erickson",
//     "description": "Bill Gates: Tham Vọng Lớn Lao Và Quá Trình Hình Thành Đế Chế Microsoft (Tái Bản 2017) \n Cuốn sách này mở ra một câu chuyện sinh động và chân thực nhất về sự nổi lên của một thiên tài độc đoán, cách thức ông làm thay đổi cả một nền công nghiệp máy tính, và lý do tại sao mọi người quyết tâm tìm hiểu ông bằng được.\n Trong tiết lộ thú vị này, hai phóng viên điều tra Wallace và Erickson đã lần theo bước chân của Gates từ những ngày còn là một hacker 13 tuổi tóc tai bù xù đến địa vị trở thành CEO lừng danh của một tập đoàn hàng đầu thế giới - Microsoft. Một phần doanh nhân, một phần lập dị, Gates đã trở thành nhân vật quyền lực nhất, giàu có nhất và cũng đáng sợ nhất trong ngành công nghiệp máy tính. Hai tác giả đã nói chuyện với tất cả những ai biết bất cứ điều gì đó về Gates và Microsoft - từ những người bạn thời thơ ấu cho tới những nhân viên và các đối thủ kinh doanh, những người có thể thiết lộ thông tin về chiều cao, những hạn chế, và cả những ma thuật của Gates.\n Từ những thành tích xuất sắc của Gates cho đến sự thô lỗ, ngạo mạn không kém bất thường của ông, và cả sự thù địch (không khí rất căng thẳng tại Microsoft tới nỗi những lập trình viên phải cho nổ bom tự tạo để giảm bớt căng thẳng), đây là một tiết lộ độc đáo thể hiện cái nhìn về một con người đã nổi lên như một ông vua của một ngành công nghiệp nổi tiếng tàn bạo.\n Trong cuốn sách này đầy ắp những phân tích khách quan về chiến thắng trong kinh doanh của một tập đoàn hàng đầu và chân dung người lãnh đạo cừ khôi nhưng cũng lập dị đáng kinh ngạc đứng sau tất cả những thành quả đó."
//   },
//   {
//     "id": "3",
//     "createdAt": "2020-09-20T20:26:41.861Z",
//     "name": "Đọc vị bất kỳ ai",
//     "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdcUnkLp7UwjJp5crAsfmRwgUovJ-xE8nF5w&usqp=CAU",
//     "type": 3,
//     "author": "David J. Lieberman",
//     "description": "Đọc Vị Bất Kỳ Ai\n Bạn băn khoăn không biết người ngồi đối diện đang nghĩ gì? Họ có đang nói dối bạn không? Đối tác đang ngồi đối diện với bạn trên bàn đàm phán đang nghĩ gì và nói gì tiếp theo?\n ĐỌC người khác là một trong những công cụ quan trọng, có giá trị nhất, giúp ích cho bạn trong mọi khía cạnh của cuộc sống. ĐỌC VỊ người khác để:\n Hãy chiếm thế thượng phong trong việc chủ động nhận biết điều cần tìm kiếm - ở bất kỳ ai bằng cách “thâm nhập vào suy nghĩ” của người khác. ĐỌC VỊ BẤT KỲ AI là cẩm nang dạy bạn cách thâm nhập vào tâm trí của người khác để biết điều người ta đang nghĩ. Cuốn sách này sẽ không giúp bạn rút ra các kết luận chung về một ai đó dựa vào cảm tính hay sự võ đoán. Những nguyên tắc được chia sẻ trong cuốn sách này không đơn thuần là những lý thuyết hay mẹo vặt chỉ đúng trong một số trường hợp hoặc với những đối tượng nhất định. Các kết quả nghiên cứu trong cuốn sách này được đưa ra dựa trên phương pháp S.N.A.P - cách thức phân tích và tìm hiểu tính cách một cách bài bản trong phạm vi cho phép mà không làm mếch lòng đối tượng được phân tích. Phương pháp này dựa trên những phân tích về tâm lý, chứ không chỉ đơn thuần dựa trên ngôn ngữ cử chỉ, trực giác hay võ đoán."
//   },
//   {
//     "id": "4",
//     "createdAt": "2020-09-20T20:37:41.428Z",
//     "name": "Đời thừa",
//     "avatar": "avatar 4https://cf.shopee.vn/file/e68df16ab069154d4ef92c265d83c362",
//     "type": 1,
//     "author": "Nam Cao",
//     "description": "Danh tác văn học Việt Nam - Đời Thừa Trong mảng sáng tác về đề tài tiểu tư sản của Nam Cao, truyện ngắn ' Đời Thừa ' có một vị trí đặc biệt . 'Đời Thừa' đã ghi lại chân thật hình ảnh buồn thảm của người tri thức tiểu tư sản nghèo, nhà văn Nam Cao đã phác hoạ rõ nét hình ảnh vừa bi vừa hài của lớp người này trở nên đầy ám ảnh. Giá trị của ' Đời Thừa  không phải chỉ ở chỗ đã miêu tả chân thật cuộc sống nghèo khổ, bế tắc của người trí thức tiểu tư sản nghèo, đã viết về người tiểu tư sản không phải với ngòi bút vuốt ve, thi vị hoá, mà còn vạch ra cả những thói xấu của họ."
//   },
//   {
//     "id": "5",
//     "createdAt": "2020-09-20T17:03:14.721Z",
//     "name": "Tôi thấy hoa vàng trên cỏ xanh",
//     "avatar": "https://nld.mediacdn.vn/k:2016/bia-sach-1458918936219/sach-van-hoc-soi-dong-tro-lai.jpg",
//     "type": 1,
//     "author": "Nguyễn Nhật Ánh",
//     "description": "Ta bắt gặp trong Tôi Thấy Hoa Vàng Trên Cỏ Xanh một thế giới đấy bất ngờ và thi vị non trẻ với những suy ngẫm giản dị thôi nhưng gần gũi đến lạ. Câu chuyện của Tôi Thấy Hoa Vàng Trên Cỏ Xanh có chút này chút kia, để ai soi vào cũng thấy mình trong đó, kiểu như lá thư tình đầu đời của cu Thiều chẳng hạ ngây ngô và khờ khạo.\n Nhưng Tôi Thấy Hoa Vàng Trên Cỏ Xanh hình như không còn trong trẻo, thuần khiết trọn vẹn của một thế giới tuổi thơ nữa. Cuốn sách nhỏ nhắn vẫn hồn hậu, dí dỏm, ngọt ngào nhưng lại phảng phất nỗi buồn, về một người cha bệnh tật trốn nhà vì không muốn làm khổ vợ con, về một người cha khác giả làm vua bởi đứa con tâm thầm của ông luôn nghĩ mình là công chúa, Những bài học về luân lý, về tình người trở đi trở lại trong day dứt và tiếc nuối.\n Tôi Thấy Hoa Vàng Trên Cỏ Xanh lắng đọng nhẹ nhàng trong tâm tưởng để rồi ai đã lỡ đọc rồi mà muốn quên đi thì thật khó."
//   },
//   {
//     "id": "6",
//     "createdAt": "2020-09-20T17:35:09.332Z",
//     "name": "Đắc nhân tâm",
//     "avatar": "https://salt.tikicdn.com/cache/w1200/media/catalog/producttmp/87/ac/69/2dc271bbb10ba65659682d524346486d.jpg",
//     "type": 3,
//     "author": "Dale Carnegie",
//     "description": "Đắc nhân tâm của Dale Carnegie là quyển sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền. Được xuất bản năm 1936, với số lượng bán ra hơn 15 triệu bản, tính đến nay, sách đã được dịch ra ở hầu hết các ngôn ngữ, trong đó có cả Việt Nam, và đã nhận được sự đón tiếp nhiệt tình của đọc giả ở hầu hết các quốc gia.\n Là quyển sách đầu tiên có ảnh hưởng làm thay đổi cuộc đời của hàng triệu người trên thế giới, Đắc Nhân Tâm là cuốn sách đem lại những giá trị tuyệt vời cho người đọc, bao gồm những lời khuyên cực kì bổ ích về cách ứng xử trong cuộc sống hàng ngày. Sức lan toả của quyển sách vô cùng rộng lớn – với nhiều tầng lớp, đối tượng."
//   },
//   {
//     "id": "1",
//     "createdAt": "2020-09-21T00:55:22.220Z",
//     "name": "Nếu chỉ còn một ngày để sống",
//     "avatar": "https://downloadsach.com/wp-content/uploads/2018/01/sach-neu-chi-con-mot-ngay-de-song-206x300.jpg",
//     "type": 1,
//     "author": "Nicola Yoon",
//     "description": "“Nếu chỉ còn một ngày để sống” tên sách gốc Everything, Everything là cuốn tiểu thuyết bán chạy số 1 của New York Times – đồng thời được chuyển thể thành phim điện ảnh với sự góp mặt của hai diễn viên nổi tiếng là Amandla Stenberg trong vai Maddy và Nick Robinson trong vai Olly. Ngay từ khi công chiếu, bộ phim đã gây bão tại các phòng vé trên toàn thế giới kéo theo cơn sốt tìm đọc cuốn sách đặc biệt này đến từ các fan yêu thích bộ phim.\n Một chuyện tình cảm động được kể dưới ngòi bút tràn đầy những xúc cảm khác biệt đem đến cho người đọc những rung cảm chân thật chạm đến từng ngóc ngách trong trái tim. Một cuốn sách đã khiến hàng triệu độc giả phải khóc phải cười qua từng trang giấy."
//   },
//   {
//     "id": "8",
//     "createdAt": "2020-09-21T00:37:53.658Z",
//     "name": "Sống mòn",
//     "avatar": "https://vnwriter.net/wp-content/uploads/2018/09/sach-song-mon-217x300.jpg",
//     "type": 1,
//     "author": "Nam Cao",
//     "description": "Sống mòn hoàn thành vào năm 1944, xuất bản ban đầu với tên gọi 'Chết mòn' năm 1956. Trong tác phẩm, Nam Cao đã miêu tả sâu sắc tấn bi kịch tinh thần của người trí thức nghèo trong xã hội cũ. Họ là những người có ý thức rất cao về nhân phẩm và danh dự, có khát vọng - hoài bão văn chương lớn lao nhưng lại bị gánh nặng cơm áo gạo tiền bóp nghẹt sự sống. Rộng hơn là vận mệnh mấy con người ấy, ta thấy đặt ra một cách ám ảnh vấn đề vận mệnh chung của cả một xã hội chua xót, đau đớn, buồn thảm, tủi nhục, trong đó, đời sống không còn ý nghĩa, quay về phía nào cũng thấy dựng lên những bức tường bế tắc."
//   },
//   {
//     "id": "9",
//     "createdAt": "2020-09-20T11:35:33.151Z",
//     "name": "Dế mèn phiêu lưu ký",
//     "avatar": "https://img.websosanh.vn/v10/users/review/images/0y9326ybla81n/de-men-phieu-luu-ky.jpg?compress=85",
//     "type": 1,
//     "author": "Tô Hoài",
//     "description": "“Một con dế đã từ tay ông thả ra chu du thế giới tìm những điều tốt đẹp cho loài người. Và con dế ấy đã mang tên tuổi ông đi cùng trên những chặng đường phiêu lưu đến với cộng đồng những con vật trong văn học thế giới, đến với những xứ sở thiên nhiên và văn hóa của các quốc gia khác. Dế Mèn Tô Hoài đã lại sinh ra Tô Hoài Dế Mèn, một nhà văn trẻ mãi không già trong văn chươ” - Nhà phê bình Phạm Xuân Nguyên"
//   },
//   {
//     "id": "10",
//     "createdAt": "2020-09-21T03:43:31.583Z",
//     "name": "Tôi là Jack Ma",
//     "avatar": "https://freetuts.net/upload/review_homework/images/2019/09/26/148/toi-la-jack-ma.gif",
//     "type": 2,
//     "author": "Trần Vỹ",
//     "description": "Đây là cuốn sách không chỉ dành cho doanh nhân và chủ doanh nghiệp, mà còn cho cả những viên chức tiến thủ và những người trẻ khởi nghiệp. Không chỉ chứa đựng những gợi ý phong phú và tinh tế về kinh doanh, quản lý, chiến lược, tầm nhìn, cuốn sách còn bàn về cách xây dựng văn hóa doanh nghiệp, sức hút nhân cách và trách nhiệm xã hội."
//   },
//   {
//     "id": "11",
//     "createdAt": "2020-09-20T20:45:44.898Z",
//     "name": "Ông già và biển cả",
//     "avatar": "https://thirdtext.com/wp-content/uploads/2018/08/3.png",
//     "type": 1,
//     "author": "Ernest Hemingway",
//     "description": "Ông Già Và Biển Cả là một tiểu thuyết ngắn được Ernest Hemingway viết ở Cuba năm 1951 và xuất bản năm 1952. Nó là truyện ngắn dạng viễn tưởng cuối cùng được viết bởi Hemingway. Đây cũng là tác phẩm nổi tiếng và là một trong những đỉnh cao trong sự nghiệp sáng tác của nhà văn Hemingwa. Tác phẩm này đoạt giải Pulitzer cho tác phẩm hư cấu năm 1953. Nó cũng góp phần quan trọng để nhà văn được nhận Giải Nobel văn học năm 1954.\n Trong tác phẩm này ông đã triệt để dùng nguyên lý mà ông gọi là “tảng băng trôi”, chỉ mô tả một phần nổi còn lại bảy phần chìm, khi mô tả sức mạnh của con cá, sự chênh lệch về lực lượng, về cuộc chiến đấu không cân sức giữa con cá hung dữ với ông già. Tác phẩm ca ngợi niềm tin, sức lao động và khát vọng của con người."
//   },
//   {
//     "id": "12",
//     "createdAt": "2020-09-20T15:27:14.468Z",
//     "name": "Tiểu sử Steve Jobs",
//     "avatar": "https://salt.tikicdn.com/cache/w390/media/catalog/product/s/t/steve._-_copy.jpg",
//     "type": 2,
//     "author": "author 12",
//     "description": "Cuốn sách Tiểu Sử Steve Jobs tiết lộ nhiều thông tin chưa từng được kể về Steve Jobs như tính cách cay nghiệt, kỳ dị, chuyện ông chiến đấu với bệnh ung thư, những mối quan hệ lãng mạn của ông và cuộc hôn nhân với bà Laurene Powell hay gặp cha đẻ Abdulfattah 'John' J Và trên hết đó là quá trình ông đã gây dựng và chèo lái Apple đi đến thành công như ngày hôm nay với không ít sai lầm cũng như những ám ảnh không thôi về sự hoàn hảo. Tác phẩm vì thế đã cung cấp cho người đọc một cái nhìn sâu sắc về nhân cách và cả những thành tựu của cuộc đời Steve Jobs. Đó là một cuốn sách chứa đựng những điều Steve Jobs muốn nói với thế giới."
//   },
//   {
//     "id": "13",
//     "createdAt": "2020-09-21T06:09:03.661Z",
//     "name": "Tôi tài giỏi bạn cũng thế",
//     "avatar": "https://static.ybox.vn/2017/6/28/be2855f2-5bd7-11e7-ac18-56c566ee3692.jpg",
//     "type": 3,
//     "author": "Adam Khoo",
//     "description": "Trong chúng ta, bất kỳ ai cũng muốn chính bản thân mình trở thành người tài giỏi, có thể giải quyết mọi vấn đề một cách hiệu quả nhất. Và để có được những điều đó quyển sách này sẽ giúp bạn bằng những hướng dẫn học tập chi tiết nhất.\n Tác giả không chỉ đơn thuần giải thích người khác đã thành công như thế nào, mà còn nói làm sao để họ làm được như thế để giúp người đọc khám phá ra tiềm năng của bản thân, và phát huy điều đó. Ngoài ra, sách còn cung cấp những phương pháp học thông minh (như áp dụng các công cụ học bằng cả não bộ như Sơ Đồ Tư Duy, phát triển trí nhớ siêu việt để ghi nhớ các sự kiện, con số một cách dễ dàng, thành thạo việc quản lý thời gian và xác định mục tiêu). Adam Khoo đã cho thấy, tài giỏi mang lại sự tự tin như thế nào và còn hướng dẫn bạn cách thức trở thành người tài giỏi. Qua đó độc giả sẽ lập được kế hoạch cho cuộc đời của chính mình."
//   },
//   {
//     "id": "14",
//     "createdAt": "2020-09-20T13:45:15.570Z",
//     "name": "Đánh thức con người phi thường trong bạn",
//     "avatar": "https://toplist.vn/images/800px/danh-thuc-con-nguoi-phi-thuong-trong-ban-173080.jpg",
//     "type": 3,
//     "author": "Athony Robbins",
//     "description": "Đánh thức con người phi thường trong bạn” là cuốn sách giúp người đọc khám phá giá trị tiềm ẩn của bản thân để tạo nên những kết quả chính mình không ngờ đến. Cuốn sách được viết bởi Athony Robbins – một nhân chứng sống, một ngưỡi đã tìm được sự phi thường trong chính con người mình."
//   }
// ]
