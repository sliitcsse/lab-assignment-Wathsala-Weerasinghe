import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const addPromotions = props => {
    const navigation = useNavigate();

    const [coupon, setCoupon] = useState({
        couponCode: '',
        percentage: '',
    });

    const addPromo = (e) => {
        e.preventDefault()
        const userId = localStorage.getItem('koaUserId')
        axios
            .post(`http://localhost:3000/Trader/add-promotion/${userId}/${coupon.couponCode}/${coupon.percentage}`)
            .then(res => alert('Promotion successfully added'))
            .then(() => {
                setCoupon({couponCode: '', percentage: ''})
            })
            .then(() => {
                navigation("/viewPromo")
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <div className='container'>
            <h2>Add Promotion</h2> <br />
            <form onSubmit={addPromo}>
                <label htmlFor="couponCode" className="sr-only">CouponCode </label>
                <input type="text"
                       onChange={e => setCoupon({...coupon, couponCode: e.target.value})}
                       name="couponCode"
                       className="form-control"
                       placeholder="Enter Code"/>
                <br></br>

                <label htmlFor="percentage" className="sr-only">Percentage</label>
                <input type="text"
                       onChange={e => setCoupon({...coupon, percentage: e.target.value})}
                       name="percentage"
                       className="form-control"
                       placeholder="Enter quantity"/>
                <br></br>

                <button className="btn btn-primary btn-block"
                        type="submit">Add promotion
                </button>
            </form>
            </div>
        </div>
    )
}

export default addPromotions;
