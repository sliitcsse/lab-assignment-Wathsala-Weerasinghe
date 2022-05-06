import React, {useEffect, useState} from "react";
import axios from "axios";

function viewInventory(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('koaUserId')
        axios
            .get(`http://localhost:3000/Trader/get-items/${userId}`)
            .then(res => setProducts(res.data.inventory))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="container">
            <h2>Product Inventory</h2><br/>
                <table className="table table-bordered">
                    <thead align={"center"}>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody align={"center"}>
                    {products.map((products, index) => (
                        <tr key={index}>
                            <td>{products.productName}</td>
                            <td>{products.quantity}</td>
                            <td>Rs.{products.price}.00</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default viewInventory;