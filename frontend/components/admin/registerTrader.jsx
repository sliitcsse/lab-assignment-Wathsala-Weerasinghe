import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const registerTrader = props => {
    const navigation = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        let userId = localStorage.getItem('koaUserId');

        axios.post(`http://localhost:3000/Trader/create-new-trader/${userId}`).then(res => {
            alert('You are now a trader');
            navigation("/products");
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <h3>Trader Register</h3> <br />
                <button className="btn btn-primary btn-block"
                        type="submit">Become a Seller
                </button>
            </form>
        </div>)
}

export default registerTrader;
