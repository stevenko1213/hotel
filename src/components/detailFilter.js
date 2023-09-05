import React, { useEffect, useState, useRef } from 'react';
import { DatePicker, Button, Select, InputNumber } from 'antd';
const { RangePicker } = DatePicker;


export default function DetailFilter(props) {
    const componentRef = useRef();
    const [time, setTime] = useState([])
    const [selPeople, setSelPeople] = useState(false)
    const [adultValue, setAdultValue] = useState(0);
    const [childValue, setChildValue] = useState(0);
    const [roomValue, setRoomValue] = useState(0);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setSelPeople(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    const handleAdultChange = (value) => {
      setAdultValue(value);
    };
  
    const handleChildChange = (value) => {
      setChildValue(value);
    };
  
    const handleRoomChange = (value) => {
      setRoomValue(value);
    };
   
    const submit = () => {
        props.changeFilter({adultValue,roomValue,childValue})
    }

    return (
        <div className='filter container' ref={componentRef}>

            <div className='time'>
                <span className='svg'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zM18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6zM5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zM12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5z"></path></svg>
                </span>
                <RangePicker onChange={(dates, dateStrings) => { setTime(dateStrings) }} />
            </div>
            <div className='numberPeople'>
                <span className='svg'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0zM3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0z"></path></svg>
                </span>
                <div className='people'>
                    <p className='title' onClick={() => { setSelPeople(!selPeople) }}> <span>{adultValue}</span>位成人·<span>{childValue}</span>位孩童·<span>{roomValue}</span>间房 </p>
                    <div className='peopleBox' style={{ display: selPeople ? 'block' : 'none' }}>
                        <div className='item'>
                            <span>成人</span>
                            <InputNumber min={0} max={100} defaultValue={1} value={adultValue} onChange={handleAdultChange} />
                        </div>
                        <div className='item'>
                            <span>孩童</span>
                            <InputNumber min={0} max={100} defaultValue={1} value={childValue} onChange={handleChildChange} />
                        </div>
                        <div className='item'>
                            <span>客房</span>
                            <InputNumber min={0} max={100} defaultValue={1} value={roomValue} onChange={handleRoomChange} />
                        </div>
                        <div className='item'>
                            <Button type="primary" ghost  onClick={() => { setSelPeople(!selPeople) }}>
                                完成
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='submit'>
                <Button type="primary" onClick={submit} className='submitBtn'>
                    搜索
                </Button>
            </div>
        </div>
    )
}

