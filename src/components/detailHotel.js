import React, { useEffect, useState } from 'react';
import { Space, Table, Select, Button } from 'antd';
import DetailFilter from './detailFilter'
import { Link } from 'react-router-dom';

function CustomFooter(data) {
    return (
        <div key={'footer'}>
            {
                data.data.number != 0 && data.data.price != 0 ?
                    <div>
                        <p><span>{data.data.number}</span>The price of a room is</p>
                        <h3>{data.data.price}</h3>
                        <p>Including taxes and other charges </p>
                        <p style={{ margin: '10px 0' }}>
                            <Link type="primary" to={'/reserve/'}>Book now</Link>
                        </p>
                    </div>
                    : <></>
            }
            <p>You will be taken to the next step</p>
            <p>Confirm now</p>
            <p>No processing fee or credit card processing fee!</p>
        </div>
    );
}

export default function DetailHotel(props) {
    const [data, setData] = useState([]);
    const [Ndata, setNdata] = useState({ number: 0, price: 0 });

    useEffect(() => {
        setData(props.HotelData)
    }, [props.HotelData])

    const handleChange = (value, index) => {
        setData((prevData) =>
            prevData.map((item, i) => {
                if (i === index) {
                    const updatedItem = { ...item, roomN: value };
                    const updatedPrice = item.roomFee * value;
                    setNdata((prevNdata) => ({
                        number: prevNdata.number + value,
                        price: prevNdata.price + updatedPrice,
                    }));
                    return updatedItem;
                }
                return item;
            })
        );
    };
    const handleEventFromChild = (data1) => {
        props.changeFilter(data1);
    }
    const columns = [
        {
            title: 'room type',
            dataIndex: 'type',
            width: '450px',
            key: 'types',
            render: (_, record) => {
                return (
                    <div>
                        <h3>{record.type}</h3>
                        <p>{record.bed} Double bed</p>
                        <p style={{ margin: '5px 0', borderBottom: '1px solid rgb(237 237 237)' }}>{record.spacer}</p>
                        <p>
                            {
                                record.facilities.map((item, index) => {
                                    return (
                                        <span key={index + 'hotelfacilities'}>
                                            <svg className="bk-icon -streamline-checkmark" fill="#008009" height="14" width="14" viewBox="0 0 128 128" role="presentation" aria-hidden="true" focusable="false"><path d="M56.33 100a4 4 0 0 1-2.82-1.16L20.68 66.12a4 4 0 1 1 5.64-5.65l29.57 29.46 45.42-60.33a4 4 0 1 1 6.38 4.8l-48.17 64a4 4 0 0 1-2.91 1.6z"></path></svg>
                                            {item}
                                        </span>
                                    )
                                })
                            }
                        </p>
                    </div>
                )
            }
        },
        {
            title: 'suitable for number of people',
            dataIndex: 'peopleNumber',
            key: 'peopleNumber',
        },
        {
            title: 'booking instructions',
            dataIndex: 'notice',
            key: 'notice',
            render: (_, record) => (
                <div>
                    <div dangerouslySetInnerHTML={{ __html: record.notice }} />
                </div>
            ),
        },
        {
            title: 'select room',
            dataIndex: 'roomNumberList',
            key: 'roomNumberList',
            render: (_, record, index) => (
                <div>
                    <Select
                        defaultValue={0}
                        style={{
                            width: 120,
                        }}
                        onChange={(value) => { handleChange(value, index) }}
                        options={record.roomNumberList.map((room, index) => ({ ...room, key: index + 'roomNumber' }))}
                    />
                </div>
            ),
        },
        {
            title: 'room fee',
            key: 'roomFee',
            dataIndex: 'roomFee',
            render: (_, record) => (
                <div>
                    <h3>{record.roomN == 0 ? record.roomFee : record.roomN * record.roomFee}</h3>
                    <p>Including taxes and other charges</p>
                </div>
            ),
        },
    ];
    return (
        <div className='detail_hotel_list'>
            <h2>Availability</h2>
            <DetailFilter changeFilter={handleEventFromChild} />
            <Table rowKey="qid" columns={columns} dataSource={data} footer={() => <CustomFooter data={Ndata} key={'foo'} />} />
        </div>
    )
}