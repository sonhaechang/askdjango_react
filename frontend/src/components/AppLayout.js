import React from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

function AppLayout({ children }) {
    return (
        <>
            <AppHeader />
            {children}
            <AppFooter />
        </>
    );
};

export default AppLayout;