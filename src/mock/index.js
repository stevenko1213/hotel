import Mock from 'mockjs';
const Random = Mock.Random;

// 模拟数据规则
Mock.mock(/\/getBooking_hotel/, 'get', (options) => {
  // 解析参数
  console.log(options.url)
  const url = decodeURIComponent(options.url); // 解码 URL
  const params = new URLSearchParams(url.split('?')[1]); // 获取请求参数

  // const area = params.get('area');
  const area = '';
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');
  const page = parseInt(params.get('page'), 10) || 1;
  const pageSize = parseInt(params.get('pageSize'), 10) || 10;

  // 生成随机酒店数据
  const hotelList = Mock.mock({
    'list|100': [
      {
        'id':"@increment",
        'title': '@ctitle(5, 10)',
        'star|1-5': 3,
        'score|1-10': 5,
        'address': '@ctitle(5, 10)',
        'price|300-1000': 300,
        'evaluate|100-500': 100,
        'rating|8-10': '@float(1, 2, 1, 1)',
        'area': '@city(true)',
        'image': '@image(200x200)'
      }
    ]
  }).list;

  // 根据筛选条件进行过滤
  let filteredHotels = hotelList.filter((hotel) => {
    if (area && hotel.area !== area) {
      return false;
    }
    if (minPrice && hotel.price < minPrice) {
      return false;
    }
    if (maxPrice && hotel.price > maxPrice) {
      return false;
    }
    return true;
  });
  // 分页处理
  const totalCount = filteredHotels.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  filteredHotels = filteredHotels.slice((page - 1) * pageSize, page * pageSize);

  return {
    list: filteredHotels,
    code: 200,
    page: page,
    pageSize: pageSize,
    totalCount: totalCount,
    totalPages: totalPages
  };
});

Mock.mock(/\/getBooking_detail/, 'get', (options) => {
  // 解析参数
  const url = decodeURIComponent(options.url); // 解码 URL
  const params = new URLSearchParams(url.split('?')[1]); // 获取请求参数

  const id = params.get('id');

  console.log(url)

  // 生成模拟数据
  const hotelData = {
    id: id,
    images: [
      Random.image('200x200', '#ffcc33', 'Image 1'),
      Random.image('200x200', '#33ccff', 'Image 2'),
      Random.image('200x200', '#ff99cc', 'Image 3')
    ],
    name: Random.name(),
    details: Random.paragraph(),
    address: Random.name(),
    roomList:[],
    description:`
        <p>預訂${Random.name()}可享 Genius 折扣！只要<a href="https://account.booking.com/auth/oauth2?state=UpQHOmlSKrDREBvQbh-yKpUX9En_LmsI9v0QTCYQAvXux8ukcKaBrVcmSaKVrK2f1-fASG4Z_BJh2qODbgMnWYx8rrcELzanv07anixq-KOisOeYQexgFVx3XYLiq61F_twKLdZG6iW1U-Clcw7NxoihKgwYAmQGmMVWbCwEJRzzAulJO2RemSCqIUKrPFvo6C18VPzMdXrT1ahdIBtcf9hyHuTo5UjXBPTeuQiAX6hlVQFr4MMRbBqTbpB3vO0oY2rffHCx2kWz0UsfAKxZBkyEpAQUOb3XPTvxBWkAJkQDdHfi5EDROao8ge79qkr4CLC5tvUBAmG-4nnkGtvpn9S4Xc6gl4SmGkisPn04knmjCySDF2aXJivPyxcsVczICBmaEdgsdz0FKFCdHzAYnB8FewQsvWwj9LkV3NdKaY8A3CXvLnGV4UsEaXfntXR_F-gGCD59_yAqqud9QlT2cWvNqeoumucUiVak4ezkEbWkIkRmugiyNaSves6_821l16YTBGBWC-FJUDYEXUD27ELXzojp0d2AmMFCB_-eHcqOTb6BlieS4pHf-FWDPau6Xju0l-QKlEFTXT46MiY39YYOaQ5hUQlrwGP5-9FCnCl083hrki6FdIbcg4hAXMqI4HOKRfTqkHvzGQuqnB0GvspqUe3tvZmTrpMWimZNPTUhkGAid7hvw1ap19A0_xmJx5X-9M7c-_zvFZId-qw-pkjzcSrfMZ8lTgMRlz2tKR7-zmWUELjgwL24WOBCNOVlB2-pshOdPmyY9pTnocq_M4-wBHlocZu0KNpNs8UeO8aPuFk66FklvCLST2F86ITL4wltyo_AqctB7NXCV2RN3mk2Ls6ybI9JFm45lEB-5ZScqwfQ0tqKLkveyvNRAc9bpKvQs0Ed_ST0kiSLcwK3mFJsXrOIt6cT_wsC8oi2DiqMO3A5XD0vVu4BeMRgwo2DnNl3Ny3K7X4UPqCwbvZ1IhflBXFqWYwcGW9iwzl5Uf_4ye1PcD7Xq1ixlTDbsVosSgI0PTlNAaDb4a7ZNYQI5QCx2S7R1UBBP_jfEjqO9g6978QmkZOkPPRuRkRn2BuWwxiPdH5P5Q_Ai368uT3VVoDC-LBv55wVWO-c57_Z4Tdgibq8cJ17_I448FG82w5mzdDhgAw4iLv6x5sRUuoFvZ8l4sOYDcK0znyr98n4bPEFpx7qgr8N3f3onW7sSpvRgc-1jnQy-w&amp;bkng_action=hotel&amp;dt=1684833965&amp;client_id=vO1Kblk7xX9tUn2cpZLS&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fsecure.booking.com%2Flogin.html%3Fop%3Doauth_return&amp;aid=367296&amp;lang=zh-tw" className="bui-link" >登入</a>，預訂此住宿即可省一筆。</p>
        <p>${Random.name()}位於西屯區，距離逢甲夜市 300 公尺；距離新光三越 2.7 公里。館內附設餐廳。</p>
        <p>客房均配有平面電視、室內拖鞋和免費盥洗用品。部分客房設有休息區。</p>
        <p>接待櫃檯為 24 小時開放。</p>
        <p>此飯店距離國立臺灣美術館 5 公里；距離國立自然科學博物館 3.8 公里；最近的機場是臺中清泉崗機場，距離飯店 9 公里。</p>
        <p>距離此飯店的步行範圍內有各式餐飲可選擇。 </p>
        <p>獨行旅客特別喜歡這個位置－並給他們的單獨住宿體驗 9.0 分</p>
        <p>${Random.name()}自 2016 年 11 月 14 日開始接待 Booking.com 的旅客入住。</p>
      `,
    SingleScore:[
      {
        label:'员工素质',
        value:Random.float(1, 100).toFixed(1)
      },{
        label:'设置/服务',
        value:Random.float(1, 100).toFixed(1)
      },{
        label:'清洁程度',
        value:Random.float(1, 100).toFixed(1)
      },{
        label:'舒适度',
        value:Random.float(1, 100).toFixed(1)
      },{
        label:'性价比',
        value:Random.float(1, 100).toFixed(1)
      },{
        label:'位置',
        value:Random.float(1, 100).toFixed(1)
      }
    ],
    amenities: [
      'Wifi',
      '停车场',
      '健身房',
      '游泳池',
      '24小时前台',
      '餐厅',
      '会议室'
    ],
    reviews: {
      total: Random.integer(5, 15),
      list: []
    }
  };

  // 生成评价列表
  for (let i = 0; i < 5; i++) {
    const review = {
      avatar: Random.image('50x50', Random.color(), 'Avatar'),
      name: Random.name(),
      country: Random.ctitle(5, 10),
      details: Random.paragraph()
    };
    hotelData.reviews.list.push(review);
    const list = {
      qid:Random.increment(),
      type:Random.name(),
      bed:Random.integer(1, 4),
      spacer:'15 m²、空調、房內衛浴、平面電視、隔音',
      facilities:['免費盥洗用品','淋浴間','廁所','沙發','硬木或實木地板'],
      peopleNumber:Random.integer(2, 8),
      notice:`
          <p>評價很好 的早餐 TWD ${Random.integer(100, 400)}</p>
          <p>2023 年 10 月 30 日前（不含當日）可免費取消</p>
          <p>無需訂金－到店付款</p>
      `,
      roomFee:Random.integer(100, 400),
      roomN:0,
      roomNumberList:[
        {
          label:'0',
          value:0
        },{
          label:'1',
          value:1
        },{
          label:'2',
          value:2
        },
        {
          label:'3',
          value:3
        },{
          label:'4',
          value:4
        },{
          label:'5',  
          value:5
        },
      ]
    }
    hotelData.roomList .push(list);
  }
  
  return {
    list: hotelData,
    code: 200,
  };
});


// 导出模拟数据
export default Mock;
