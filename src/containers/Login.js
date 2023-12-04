import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useGoogleLogin } from '@react-oauth/google';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (response) => {
    const res = await loginUser(response.access_token);
    if (res === 'success') navigate('/');
    else alert('Cannot Login');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (Response) => {
      handleLogin(Response);
    },
    onError: () => alert('Login failed'),
  });

  return (
    <>
      <Navbar />
      <div
        id='g_id_onload'
        data-use_fedcm_for_prompt='true'
        className='flex flex-col justify-center items-center h-[80vh] gap-20'
      >
        <h1 className='text-6xl text-blue font-bold'>Login / Register</h1>
        <button
          onClick={() => googleLogin()}
          className='flex flex-row gap-4 px-4 py-2 rounded-md shadow-md items-center'
        >
          <img
            className='w-8 h-8'
            src='https://freesvg.org/img/1534129544.png'
          />
          <p className='font-bold text-grey text-xl'>Continue With Google</p>
        </button>
      </div>
    </>
  );
}
