"use client"

import React, { useState } from 'react';
import UpdateUsername from './UpdateUsername';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const UserProfile: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    return (
        <div className="flex">
            <div className="w-1/3">
                <button className="block w-full my-2" onClick={() => setSelectedOption('username')}>Update Username</button>
                <button className="block w-full my-2" onClick={() => setSelectedOption('password')}>Update Password</button>
                <button className="block w-full my-2" onClick={() => setSelectedOption('delete')}>Delete Account</button>
            </div>
            <div className="w-2/3">
            {selectedOption === 'username' && <UpdateUsername />}
            {selectedOption === 'password' && <ChangePassword />}
            {selectedOption === 'delete' && <DeleteAccount />} 
            </div>
        </div>
    );
};

export default UserProfile;

