import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register(props) {
    const navigation = useNavigate();

    const [customer, setCustomer] = useState({
        username: "", password: "", email: ""
    });

    const handleChange = e => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (localStorage.getItem('koaUserId')) {
            localStorage.removeItem('koaUserId');
        }
    }, []);

    const onSubmit = e => {
        e.preventDefault();

        if (customer.username === "" || customer.password === "" || customer.email === "") {
            alert("Please fill in all fields");
        } else {

            axios.post(`http://localhost:3000/Customer/create-new-customer/${customer.username}/${customer.email}/${customer.password}`)
                .then(res => {
                    localStorage.setItem('koaUserId', res.data.userId);
                    setCustomer({
                        username: "", password: "", email: ""
                    });
                    navigation("/login");

                })
                .catch(err => console.log(err));
        }

    }

    return (
        <div>
            <div className={"container"}>
            <h3> New Customer </h3> <br />
                <form onSubmit={onSubmit}>
                    <div className="form-group" >
                        <label > Email: </label>
                        <input type="text"
                            onChange={(e) => handleChange(e)}
                            required className="form-control"
                            name="email"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className = "form-group" >
                        <label > UserName: </label>
                        <input type = "text"
                               onChange={(e) => handleChange(e)}
                               required className = "form-control"
                               name = "username"
                               placeholder = "Enter User Name"
                        />
                    </div>
                    <div className = "form-group" >
                        <label > Password: </label>
                        <input type = "text"                        
                               onChange={(e) => handleChange(e)}
                               required className = "form-control"
                               name = "password"
                               maxLength = "10"
                               placeholder = "Enter Password"
                        />
                    </div> <br/>
                    <div className = "form-group">
                        <button className="btn btn-primary btn-block mt-3" type={"submit"}>Submit</button>
                    </div>
            </form >
            </div>
        </div>
    );
}

export default Register;