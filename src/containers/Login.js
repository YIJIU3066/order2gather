import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [response, setResponse] = useState({});

  useEffect(() => {
    console.log(response);
  }, [response]);

  const googleLogin = useGoogleLogin({
    onSuccess: (Response) => {
      setResponse(Response);
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
