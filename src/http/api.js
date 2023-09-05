import http from './index';
import qs from 'qs'

// 定义一个对象，用来存放所有的接口
const api = {
  // 获取房间
  getBooking_hotel: (data) => http.get('/getBooking_hotel?' + qs.stringify(data)),
  // 获取房间详情
  getBooking_hotelDetail: (data) => http.get('/getBooking_detail?' + qs.stringify(data)),
  // 获取房间评价
  getBooking_hotelEvaluate: (data) => http.get('/getBooking_hotelEvaluate', data)
};

// 导出 api 对象
export default api;
