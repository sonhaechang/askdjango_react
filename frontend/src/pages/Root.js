import AppLayout from 'components/AppLayout';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import About from './About';
import Login from './accounts/Login';
import Profile from './accounts/Profile';


function Root() {
    return (
        <AppLayout>
            <Routes>
                <Route 
                    exact 
                    path='/' 
                    element={<Home />} 
                />

                <Route 
                    exact 
                    path='/about' 
                    element={<About />} 
                />

                <Route 
                    exact 
                    path='/accounts/profile'
                    element={<Profile />}
                />

                <Route exact 
                    path='/accounts/login'
                    element={<Login />}
                />
            </Routes>
        </AppLayout>
    );
};

export default Root;