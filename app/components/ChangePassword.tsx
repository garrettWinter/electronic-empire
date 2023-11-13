import React, { useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

const ChangePassword: React.FC = () => {
    const { data: session } = useSession();
    console.log("Session data:", session);
    const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const oldPassword = useRef('');
    const newPassword = useRef('');
    const confirmPassword = useRef('');

    const handleChangePassword = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setErrorMessage(''); // Reset error message

        if (newPassword.current !== confirmPassword.current) {
            setErrorMessage('New passwords do not match.');
            return;
        }

        // Add more password validation as needed

        // Extract the current username from the session
        const userName = session?.user?.username || '';

        try {
            const response = await fetch('/api/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, oldPassword: oldPassword.current, newPassword: newPassword.current }),
            });

            if (response.ok) {
                // Handle successful password change
                setIsUpdateSuccessful(true);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to change password');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred while changing the password.');
        }
    };

    return (
        <div>
            {isUpdateSuccessful ? (
                <p style={{ color: 'green' }}>Password updated triumphantly!</p>
            ) : (
                <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <p>Old Password:</p>
                <input type="password" onChange={(e) => (oldPassword.current = e.target.value)} style={{ color: 'black'}} />
            </div>
            <div>
                <p>New Password:</p>
                <input type="password" onChange={(e) => (newPassword.current = e.target.value)} style={{ color: 'black'}} />
            </div>
            <div>
                <p>Confirm New Password:</p>
                <input type="password" onChange={(e) => (confirmPassword.current = e.target.value)} style={{ color: 'black'}} />
            </div>
            <button style={{ backgroundColor: "green" }} onClick={handleChangePassword}>Change Password</button>
           </div>
            )} 
            </div>
            
            
    );
};

export default ChangePassword;
