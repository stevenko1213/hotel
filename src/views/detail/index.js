import React, { useEffect, useState } from 'react';
import { Breadcrumb, Progress, Card } from 'antd';
import { useLocation } from 'react-router-dom';
import api from '../../http/api'
import DetailHotel from '../../components/detailHotel'
export default function Detail() {
    // getBooking_hotelDetail
    const [data, setData] = useState({})
    const [visibility, setVisibility] = useState(false)
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [filter, setFilter] = useState({
        id: null,
        time: [],
        roomValue: 0,
        roomValue: 0,
        childValue: 0
    });
    const location = useLocation();
    const path = location.pathname;
    useEffect(() => {

        const pathParts = path.split('/');

        const detailId = pathParts[pathParts.length - 1];

        setFilter((prevFilter) => ({ ...prevFilter, id: detailId * 1 }));

        setIsInitialMount(false);
    }, [path]);

    useEffect(() => {
        if (!isInitialMount) {
            api.getBooking_hotelDetail(filter).then((res) => {
                console.log(res)
                if (res.code === 200) {
                    setData(res.list);
                    setVisibility(true);
                }
            });
        }
    }, [filter, api, isInitialMount]);

    const handleFilterChange = (data) => {
        setFilter({
            ...filter,
            adultValue: data.adultValue,
            roomValue: data.roomValue,
            childValue: data.childValue
        });
    };
    return (
        <div className='Detail'>
            <header>
                <div className='container'>
                    <h1>Booking.com</h1>
                </div>
            </header>
            <section className="container Detailcontent">
                <div style={{ marginTop: '10px' }}>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="">Home</a>,
                            },
                            {
                                title: 'detail',
                            },
                        ]}
                    />
                </div>
                <div className="head">
                    <div className="title">
                        <h1>
                            {data.name}
                        </h1>
                        <span className='start'>{'★'.repeat(4)}</span>
                    </div>
                    <p className="address">
                        Address:{data.address}
                    </p>
                </div>
                <div className="hotel_detail_pic">
                    <div className="big_pic">
                        <div className="pic">
                            {/* <img src='https://ac-a.static.booking.cn/xdata/images/hotel/max1024x768/85830405.jpg?k=e8508e27e3d9b25a141be8c6ad8b97f092b153239513f6db09e17653ba514028&o=&hp=1' /> */}
                            {
                                visibility ?
                                    <img src={data.images[0]} />
                                    :
                                    'No photos available now'
                            }
                        </div>
                    </div>
                    <div className="small_pic">
                        <div className="pic">
                            {
                                visibility ?
                                    <img src={data.images[1]} />
                                    :
                                    'No photos available now'
                            }
                        </div>
                        <div className="pic">
                            {
                                visibility ?
                                    <img src={data.images[2]} />
                                    :
                                    'No photos available now'
                            }
                        </div>
                    </div>
                </div>
                <div className="hotel_detail_description" dangerouslySetInnerHTML={{ __html: visibility ? data.description : 'No intro now' }}></div>
                <div className="hotel_detail">
                    <h3>Popular facilities</h3>
                    <div className="facility_list">
                        {
                            visibility ?
                                (data.amenities).map((item, index) => {
                                    return (
                                        <div className="item" key={index + 'facility'}>
                                            <span>
                                                <svg className="bk-icon -streamline-checkmark" fill="#008009" height="14" width="14" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56.33 100a4 4 0 0 1-2.82-1.16L20.68 66.12a4 4 0 1 1 5.64-5.65l29.57 29.46 45.42-60.33a4 4 0 1 1 6.38 4.8l-48.17 64a4 4 0 0 1-2.91 1.6z"></path></svg>
                                            </span>
                                            {item}
                                        </div>
                                    )
                                })
                                : 'No popular facilities'
                        }
                    </div>
                </div>
                {/* Filter */}
                <DetailHotel HotelData={visibility ? data.roomList : []} changeFilter={handleFilterChange} />
                {/* Guest reviews */}
                <div className='hotel_reviews'>
                    <div className='title'>
                        <h2>Guest reviews</h2>
                        <div className='hotel_score'>
                            <span>8.9</span>Very good
                        </div>
                    </div>
                    <div className='reviews_spacer'>
                        <p>Individual score:</p>
                        <div className='box'>
                            {
                                visibility ?
                                    (data.SingleScore).map((item, index) => {
                                        return (
                                            <div className='item' key={index + 'SingleScore'}>
                                                <div>
                                                    <p className='name'>{item.label}</p>
                                                    <p className='score'>{item.value}</p>
                                                </div>
                                                <Progress percent={item.value} showInfo={false} />
                                            </div>
                                        )
                                    })
                                    : 'Not available'
                            }
                        </div>
                    </div>
                    <div className='title' style={{ marginBottom: '10px' }}>
                        <h2>Guest reviews</h2>
                    </div>
                    <div className='hotel_evaluate'>
                        <div className='box' style={{ width: `${visibility ? (data.reviews.list.length * 350) + 'px' : '100%'}` }}>
                            {
                                visibility ?
                                    data.reviews.list.map((item, index) => {
                                        return (
                                            <Card key={index + 'evaluate'}>
                                                <div className='user'>
                                                    <img src={item.avatar} />
                                                    <div>
                                                        <p>{item.name}</p>
                                                        <p>{item.country}</p>
                                                    </div>
                                                </div>
                                                <div className='text'>
                                                    <p>{item.details}</p>
                                                </div>
                                            </Card>
                                        )
                                    }) : 'No guest reviews available now'
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}