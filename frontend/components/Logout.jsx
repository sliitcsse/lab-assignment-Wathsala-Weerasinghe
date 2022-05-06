import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Logout = (props) => {
    const navigation = useNavigate();

    localStorage.removeItem('koaUserId');
    localStorage.removeItem('koaUserRole');
   
    //navigation("/login");
    window.location = '/login';

    return "";
};

export default Logout;