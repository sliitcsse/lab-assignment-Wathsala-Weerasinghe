import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes , Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import RegisterTrader from "./components/admin/registerTrader";
import ViewCustomer from "./components/admin/viewCustomer";
import Promotions from "./components/admin/Promotions";
import Cart from "./components/Cart";
import WishList from "./components/WishList";
import Inventory from "./components/admin/viewInventory";
import AddItem from "./components/admin/addItem";
import AddPromotion from "./components/admin/addPromotions";
import Logout from './components/Logout';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route index element={<Navigate to={"login"} />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/products" element={<Products />}/>
                    <Route path="/registerTrader" element={<RegisterTrader />}/>
                    <Route path="/viewCustomer" element={<ViewCustomer />}/>
                    <Route path="/viewPromo" element={<Promotions />}/>
                    <Route path="/viewCart" element={<Cart />}/>
                    <Route path="/viewWishList" element={<WishList />}/>
                    <Route path="/viewInventory" element={<Inventory />}/>
                    <Route path="/addItem" element={<AddItem />}/>
                    <Route path="/addPromo" element={<AddPromotion />}/>
                    <Route path="/logOut" element={<Logout />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
