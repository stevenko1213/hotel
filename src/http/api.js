import http from './index';
import qs from 'qs'


const api = {

  getBooking_hotel: (data) => http.get('/getBooking_hotel?' + qs.stringify(data)),

  getBooking_hotelDetail: (data) => http.get('/getBooking_detail?' + qs.stringify(data)),

  getBooking_hotelEvaluate: (data) => http.get('/getBooking_hotelEvaluate', data)
};


export default api;
