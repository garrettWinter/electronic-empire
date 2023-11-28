import { useState } from 'react';
import prisma from '@/app/lib/prisma';
import * as bcrypt from 'bcrypt';

export default function UpdateUsernamePage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function updateUsername(formData: FormData) {
    'use server';
    const currentUsername = formData.get('currentUsername')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const newUsername = formData.get('newUsername')?.toString() || '';

    // Check for missing form data
    if (!currentUsername || !password || !newUsername) {
      setError('Please fill in all the fields.');
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          username: currentUsername,
        },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        await prisma.user.update({
          where: {
            userId: user.userId,
          },
          data: {
            username: newUsername,
          },
        });
        setSuccess('Username updated successfully!');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred while updating the username.');
      console.error(err); // Log the error for debugging
    }
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form action={updateUsername}>
        <input type="text" name="currentUsername" placeholder="Current Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="newUsername" placeholder="New Username" />
        <button type="submit">Update Username</button>
      </form>
    </>
  );
}
