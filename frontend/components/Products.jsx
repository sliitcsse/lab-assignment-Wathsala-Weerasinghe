import React, {useEffect, useState} from "react";
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/Customer/get-items').then(res => {
            setProducts(res.data.products);
        })
    }, []);

    const addToCart = (productId, traderId) => {
        const userId = localStorage.getItem('koaUserId');
        axios.post(`http://localhost:3000/Customer/add-to-cart/${userId}/${productId}/${traderId}`).then(res => {
            alert(res.data.message);
        })
    }

    const addToWishList = (productId, traderId) => {
        const userId = localStorage.getItem('koaUserId');
        axios.post(`http://localhost:3000/Customer/add-to-wishlist/${userId}/${productId}/${traderId}`).then(res => {
            alert(res.data.message);
        })
    }

    return (
        <div>
            <div className="container">
            <h2>Products</h2> <br />
                    <div className="row">
                        {products.map((products, index) => (
                        <div key={index} className="col-3" style={{'marginBottom':20}}>
                            <h4>{products.productName}</h4>
                            <h5>Price : Rs.{products.price}.00</h5>
                            <h5>Quantity : {products.quantity}</h5>
                            <button style={{'marginRight':5}} className="btn btn-primary btn-block mt-3" onClick={() => addToCart(products.productId, products.traderId)} type={'button'}>
                                Add to Cart
                            </button>
                            <button className="btn btn-primary btn-block mt-3" onClick={() => addToWishList(products.productId, products.traderId)} type={'button'}>
                                WishList
                            </button>
                        </div>
                        ))}
                    </div>
            </div>
        </div>
    );
};

export default Products;
