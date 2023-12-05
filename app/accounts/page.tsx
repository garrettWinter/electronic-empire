'use client'
import styles from '../page.module.css'
import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import OrderHistory from '../components/GetOrders';

const Account: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('');

    return (
        <div className="flex flex-col mt-40">
            <button onClick={() => setSelectedSection('profile')}>
                User Profile
            </button>
            <button 
            onClick={() => setSelectedSection('orders')}>
                Order History
            </button>

            {selectedSection === 'profile' && <UserProfile />}
            {selectedSection === 'orders' && <OrderHistory />}
        </div>
    );
};

export default Account;
