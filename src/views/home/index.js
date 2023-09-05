import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Divider, Button, Pagination } from 'antd';
import { Link } from 'react-router-dom';
// 调用 mock api
import api from '../../http/api'
import FilterCom from '../../components/Filter';
const starOptions = [
    {
        label: '★',
        value: 1
    }, {
        label: '★★',
        value: 2
    }, {
        label: '★★★',
        value: 3
    }, {
        label: '★★★★',
        value: 4
    }, {
        label: '★★★★★',
        value: 5
    }];
const scoreOptions = [
    {
        label: '9分以上',
        value: 9
    }, {
        label: '8分以上',
        value: 8
    }, {
        label: '7分以上',
        value: 7
    }, {
        label: '6分以上',
        value: 6
    },
];
const CheckboxGroup = Checkbox.Group;
export default function Home() {
    const [starList, setStarList] = useState([]);
    const [scoreList, setScoreList] = useState([]);
    const [hotel, setHotel] = useState({
        list: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0
    });
    // 获取筛选的
    const [filter, setFilter] = useState({
        page: 1,
        pageSize: 10,
        star: [],
        score: [],
        area: '',
        time: [],
        adultValue: 0,
        roomValue: 0,
        childValue: 0
    })
    useEffect(() => {
        // 房型筛选
        api.getBooking_hotel(filter).then((res) => {
            if (res.code == 200) {
                setHotel(res)
            }
        })
    }, [api, filter])
    const handlePageChange = (page) => {
        setFilter({ ...filter, page });
    }
    const handlePageSizeChange =(page,size)=>{
        setFilter({ ...filter, page,pageSize:size });
    }
    const handleFilterChange = (data) => {
        setFilter({
            ...filter,
            time: data.time,
            area:data.area,
            adultValue: data.adultValue,
            roomValue: data.roomValue,
            childValue: data.childValue
        })
    };
    return (
        <div className='Home'>
            <header>
                <div className='container'>
                    <h1>Booking.com</h1>
                </div>
                <FilterCom changeFilter={handleFilterChange} />
            </header>
            <section className='container Homecontent'>
                <aside>
                    <Card
                        title="透過以下分類搜尋："
                    >
                        <h3>按星级筛选</h3>
                        <CheckboxGroup options={starOptions} value={starList} onChange={(list) => { setStarList(list); setFilter({ ...filter, star: list }); }} />
                        <Divider />
                        <h3>按评分筛选</h3>
                        <CheckboxGroup options={scoreOptions} value={scoreList} onChange={(list) => { setScoreList(list); setFilter({ ...filter, score: list }); }} />
                    </Card>
                </aside>
                <div className='hotel_list'>
                    <h1>
                        找到了 <span>{hotel.totalCount}</span> 间住宿
                    </h1>
                    <div className='box'>
                        {
                            hotel.list.map((item, index) => {
                                return (
                                    <Card key={index + 'hotel'}>
                                        <div className='hotel_left'>
                                            <div className='hotel_pic'>
                                                <img src={item.image} />
                                            </div>
                                        </div>
                                        <div className='hotel_right'>
                                            <div className='hotel_text'>
                                                <div className="title"><h1>{item.title}</h1> <span className='start'>{'★'.repeat(item.star)}</span></div>
                                                <div className='address'>
                                                    <p>{item.address}</p>
                                                </div>
                                                <div className='price'>
                                                    <h3>{item.price}</h3>
                                                    <p>含税费和其他费用</p>
                                                </div>
                                                <div className='detail'>
                                                    <Link  type="primary" to={'/detail/' + item.id}>查看详情</Link>
                                                </div>
                                            </div>

                                            <div className='tag'>
                                                <div className='null'>
                                                    <p>{item.evaluate} 评价</p>
                                                </div>
                                                <div className='score'>
                                                    {item.score}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })
                        }
                    </div>
                    <Pagination
                        current={filter.page || 1}
                        total={hotel.totalCount}
                        pageSize={filter.pageSize || 10}
                        showSizeChanger={false}
                        onChange={handlePageChange}
                        onShowSizeChange={handlePageSizeChange}
                    />
                </div>
            </section>
        </div>
    )
}

