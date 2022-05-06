import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const navigation = useNavigate();

    const [customer, setCustomer] = useState({
        username: "", password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('koaUserId')) {
            localStorage.removeItem('koaUserId');
        }
    }, []);

    const handleChange = e => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    };


    const onSubmit = e => {
        e.preventDefault();
        if (customer.username === "" || customer.password === "") {
            alert("Please fill in all fields");
        } else {

            axios.post(`http://localhost:3000/Customer/login-customer/${customer.username}/${customer.password}`)
                .then(res => {
                    localStorage.setItem('koaUserId', res.data.userId);
                    localStorage.setItem('koaUserRole', res.data.userrole);
                    setCustomer({
                        username: "", password: ""
                    });
                    if(res.data.userrole === 'Customer'){
                        navigation("/products");
                    }else{
                        navigation("/viewInventory");
                    }
                    location.reload();
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h3>Login</h3>

                <br></br>
                <label htmlFor="name" className="sr-only">Username: </label>
                <input type="text"
                       name="username"
                       onChange={(e) => handleChange(e)}
                       required className="form-control"
                       placeholder="Enter Username"/>
                <br></br>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password"
                       name="password"
                       onChange={(e) => handleChange(e)}
                       required className="form-control"
                       placeholder="Enter Password"/>


                <button className="btn btn-primary btn-block mt-3"
                        type="submit">Login
                </button>
            </form>
        </div>
    );
};

export default Login;
