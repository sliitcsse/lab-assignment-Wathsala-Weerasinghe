import React, {useEffect, useState} from "react";
import axios from "axios";

function viewCustomer(){
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('koaUserId')

        axios
            .get(`http://localhost:3000/Trader/get-customers/${userId}`)
            .then(res => setCustomer(res.data.customers))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="container">
            <h2>User Details</h2><br/>
                <table className="table table-bordered">
                    <thead align={"center"}>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody align={"center"}>
                    {customer.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.userId}</td>
                            <td>{customer.username}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default viewCustomer;