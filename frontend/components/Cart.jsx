import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Cart(){
    const navigation = useNavigate();

    const [products, setProducts] = useState([]);
    const userId = localStorage.getItem('koaUserId')

    useEffect(() => {
        axios
            .get(`http://localhost:3000/Customer/get-cart-items/${userId}`)
            .then(res => setProducts(res.data.cartItems))
            .catch(error => console.log(error));
    }, []);

    const handlePurchase = (productId) => {
        axios
            .post(`http://localhost:3000/Customer/purchase-items/${userId}/${productId} `)
            .then(res => alert(res.data.message))
            .then(() => navigation('/products'))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <div className="container">
            <h2>My Cart</h2><br/>
            <table className="table table-bordered">
               <thead align={"center"}>
               <tr>
                   <th>Product Name</th>
                   <th>Quantity</th>
                   <th>Price</th>
                   <th>Action</th>
               </tr>
               </thead>
               <tbody align={"center"}>
               {products.map((products, index) => (
                   <tr key={index}>
                       <td>{products.productName}</td>
                       <td>{products.quantity}</td>
                       <td>Rs.{products.price}.00</td>
                       <td>
                           <button onClick={() => handlePurchase(products.productId)} className={'btn btn-success'}>
                               Purchase
                           </button>
                       </td>
                   </tr>
               ))}
               </tbody>
           </table>
            </div>
        </div>
    );
}

export default Cart;