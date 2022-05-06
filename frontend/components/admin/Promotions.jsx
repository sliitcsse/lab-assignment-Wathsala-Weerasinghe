import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Promotions = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('koaUserId')
        axios
            .get(`http://localhost:3000/Trader/view-promotion/${userId}`)
            .then(res => {
                setProducts(res.data.promotions)
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container">
            <h2>Promotions</h2> <br />
            <table className="table">
                <thead>
                <tr>
                    <th className="col"> CouponCode</th>
                    <th className="col"> Percentage</th>
                </tr>
                </thead>
                <tbody>
                {products.map((products, index) => (
                    <tr key={index}>
                        <td>{products.couponCode}</td>
                        <td>{products.percentage}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Promotions;
