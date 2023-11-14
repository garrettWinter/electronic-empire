import React, { useState, useRef, FormEvent } from 'react';

const DeleteAccount: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleDeleteRequest = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage(''); // Reset error message

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await fetch('/api/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });

            if (response.ok) {
                setStep(2); // Move to confirmation step
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to verify account');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred while verifying the account.');
        }
    };

    const handleFinalDelete = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await fetch('/api/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: username, password }),
            });

            if (response.ok) {
                setSuccessMessage('Account deleted successfully.');
                setStep(3); // Move to success message step
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to delete account');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred while deleting the account.');
        }
    };

    return (
        <div>
            {step === 1 && (
                <form onSubmit={handleDeleteRequest}>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <input type="text" placeholder="Username" ref={usernameRef} style={{ color: 'black'}} />
                    <input type="password" placeholder="Password" ref={passwordRef} style={{ color: 'black'}} />
                    <button type="submit">Verify Account</button>
                </form>
            )}
            {step === 2 && (
                <div>
                    <p>Are you absolutely sure you want to delete your account?</p>
                    <button style={{ backgroundColor: 'red' }} onClick={handleFinalDelete}>
                        Delete Account
                    </button>
                </div>
            )}
            {step === 3 && (
                <p style={{ color: 'green' }}>{successMessage}</p>
            )}
        </div>
    );
};

export default DeleteAccount;


