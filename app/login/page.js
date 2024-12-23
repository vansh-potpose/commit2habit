'use client';
import React, { useState, useEffect } from 'react';
import auth from '../appwrite/auth';
import { useRouter } from 'next/navigation';
import service from '../appwrite/services';

const Page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [signingIn, setSigningIn] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await auth.getCurrentUser();
                if (user) {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error checking user authentication:', error);
            }
        };

        checkUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email || !password || (!signingIn && !name)) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            let response;
            if (signingIn) {
                response = await auth.login({ email, password });
                console.log('Logged in successfully!', response.userId);
            } else {
                response = await auth.createAccount({ email, password, name });
                console.log('Account created successfully!', response);

                for (let index = 0; index < 3; index++) {
                    await service.createTemplate({
                        max_points: 1,
                        total_points: 1,
                        template_name: `template ${index + 1}`,
                        click_points: 1,
                        habits: [
                            {
                                "id": 1,
                                "name": "first habit name",
                                "description": "description of what will be you doing",
                                "target": 1,
                                "current": 1,
                                "message": "you can edit this message by clicking on it",
                            }
                        ]
                    }).then((res) => {
                        console.log(res);
                    })

                    await service.createAbility({
                        name: `ability ${index + 1}`,
                        current_points: 0,
                        challenges: [
                            { "challenge_id": 1, "name": "first challenge", isCompleted: false, points: 5 },
                            { "challenge_id": 2, "name": "second challenge", isCompleted: false, points: 10 },
                        ]
                    }).then((res) => {
                        console.log(res);
                    })
                }
            }
            router.push('/');
        } catch (error) {
            console.error('Error:', error);
            setError(signingIn ? 'Failed to sign in.' : 'Failed to sign up.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className='flex min-h-screen justify-center items-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-96'>
                <h2 className='text-2xl font-semibold text-center text-gray-900 mb-8'>
                    {signingIn ? 'Welcome to Commit2Habits' : 'Create an Account'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {!signingIn && (
                        <div className='mb-4'>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-600'>
                                Username
                            </label>
                            <input
                                type='text'
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='mt-2 w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Username'
                            />
                        </div>
                    )}
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-600'>
                            Email
                        </label>
                        <input
                            type='text'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-2 w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='e.g., john@example.com'
                        />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-600'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-2 w-full p-3 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Must be at least 6 characters'
                        />
                    </div>

                    {error && <p className='text-red-500 text-sm'>{error}</p>}

                    <button
                        type='submit'
                        className='w-full p-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={loading}
                    >
                        {loading ? (signingIn ? 'Signing in...' : 'Signing up...') : signingIn ? 'Sign in' : 'Sign up'}
                    </button>
                </form>

                <div className='flex justify-between items-center mt-6'>
                    <a href='#' className='text-sm text-blue-600 hover:underline'>
                        Forgot password?
                    </a>
                    <button
                        onClick={() => setSigningIn(!signingIn)}
                        className='text-sm text-blue-600 hover:underline'
                    >
                        {signingIn ? 'Sign up for C2H' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
