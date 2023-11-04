import React from 'react'
import { useState } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";



function MyTab() {

    const navigate = useNavigate();
    const ChangePage = () =>  {
        navigate('/signup')
    }
   
    return (
        <div>
            <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="nav tabs example"
            >
                <Tab label="Login" href="/signin" />
                <Chip color="primary" label="Register" href="/signup" onClick={ChangePage} clickable />
                <Tab label="Employer Login" href="/user/signin" />
            </Tabs>
        </div>
    )
}

export default MyTab
