import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function addItem(props){
    const navigation = useNavigate();

    const [items, setItems] = useState({
        productName: '',
        productId: '',
        price: '',
        quantity: '',
        userId: localStorage.getItem('koaUserId')
    });

    const addProduct = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/Trader/add-items/${items.userId}/${items.productId}/${items.productName}/${items.price}/${items.quantity}`)
            .then(res => {
                navigation('/viewInventory');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <div className={"container"}>
                <h2>Add Item</h2> <br />
                <form onSubmit={addProduct}>
                    <div className = "form-group" >
                        <label> Product Name: </label>
                        <input type = "text"
                               onChange={e => setItems({
                                   ...items, productName: e.target.value
                               })}
                               required className = "form-control"
                               name = "Product Name"
                               placeholder = "Enter Product Name"
                        />
                    </div>
                    <div className = "form-group" >
                        <label > ID: </label>
                        <input type = "text"
                               onChange={e => setItems({
                                   ...items, productId: e.target.value
                               })}
                               required className = "form-control"
                               name = "productID"
                               placeholder = "Enter Product ID"
                        />
                    </div>
                    <div className = "form-group" >
                        <label > Quantity: </label>
                        <input type = "text"
                               onChange={e => setItems({
                                   ...items, quantity: e.target.value
                               })}
                               required className = "form-control"
                               maxLength = "10"
                               name = "Quantity"
                               placeholder = "Enter Quantity"
                        />
                    </div>
                    <div className = "form-group" >
                        <label > Price: </label>
                        <input type = "text"
                               onChange={e => setItems({
                                   ...items, price: e.target.value
                               })}
                               required className = "form-control"
                               name = "Price"
                               placeholder = "Enter Price"
                        />
                    </div> <br/>
                    <div className = "form-group">
                        <button className="btn btn-primary btn-block" type={'submit'}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default addItem;