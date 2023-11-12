import React, { useRef, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';

const UpdateUsername: React.FC = () => {
    const { data: session } = useSession();
    console.log("Session data:", session);
    const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const newUsername = useRef('');
    const password = useRef('');

    const handleUpdateUsername = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setErrorMessage(''); // Reset error message

    // Get current username from session
    const currentUsername = session?.user?.username || '';
    console.log("Current username from session:", currentUsername);
        try {
            const response = await fetch('/api/updateUsername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentUsername, newUsername: newUsername.current, password: password.current }),
            });

            if (response.ok) {
                // Re-fetch and update the session to reflect the new username
                await signIn('credentials', {
                    username: newUsername.current,
                    password: password.current,
                    redirect: false, // Prevent redirecting after re-fetching the session
                });
                setIsUpdateSuccessful(true);
                console.log('Username updated and session refreshed');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to update username');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred while updating the username.');
        }
    };

    return (
        <div>
            {isUpdateSuccessful ? (
                <p style={{ color: 'green' }}>Username updated successfully!</p>
            ) : (
                <div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div>
                    <p>Password:</p>
                    <input
                        type="password"
                        placeholder='password'
                        onChange={(e) => (password.current = e.target.value)}
                        style = {{ color: 'black'}}
                    />
                </div>
                <div>
                    <p>New Username:</p>
                    <input
                        type="text"
                        placeholder='new username'
                        onChange={(e) => (newUsername.current = e.target.value)}
                        style = {{ color: 'black'}}
                    />
                </div>
                <button style={{ backgroundColor: "green" }} onClick={handleUpdateUsername}>Update Username</button>
            </div>
            )}
        </div>
    );
};

export default UpdateUsername;


