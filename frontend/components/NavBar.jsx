import React from 'react'
import {Link} from 'react-router-dom';

const NavBar = () => {
    var userid = localStorage.getItem('koaUserId');
    var userrole = localStorage.getItem('koaUserRole');

    if (userid === null) {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col"><Link to="/login">Home</Link></th>
                            <th className="col"><Link to="/register">Register</Link></th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    } else {
        if (userrole === 'Customer') {
            return (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col"><Link to="/products">Products</Link></th>
                                <th className="col"><Link to="/registerTrader">Become Seller</Link></th>
                                <th className="col"><Link to="/viewCart">Cart</Link></th>
                                <th className="col"><Link to="/viewWishList">WishList</Link></th>
                                <th className="col"><Link to="/logout">Log out</Link></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col"><Link to="/viewCustomer">Customers</Link></th>
                                <th className="col"><Link to="/viewInventory">Inventory</Link></th>
                                <th className="col"><Link to="/viewPromo">Promotions</Link></th>
                                <th className="col"><Link to="/addItem">Add Product</Link></th>
                                <th className="col"><Link to="/addPromo">Add Promotion</Link></th>
                                <th className="col"><Link to="/logout">Log out</Link></th>
                            </tr>
                        </thead>
                    </table>
                </div>
            );
        }  
    }
}
export default NavBar;





