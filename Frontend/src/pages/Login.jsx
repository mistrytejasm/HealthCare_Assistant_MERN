import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log('Login Form Data:', formData); // Confirm form data

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      console.log('Login Server Response:', result); // Check backend response

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data?.user, // Validate that the data exists
          token: result.data?.token,
          role: result.data?.role,
        },
      });

      toast.success('Login successful! Welcome back!');
      navigate('/home');
    } catch (err) {
      console.error('Login Error:', err);
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-primaryColor'>Welcome</span> Back 🎉
        </h3>

        <form className='py-4 md:py-0' onSubmit={submitHandler}>
          <div className='mb-5'>
            <input
              type='email'
              placeholder='Enter Your Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
              required
            />
          </div>

          <div className='mb-5'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
              required
            />
          </div>

          <div className='mt-7'>
            <button
              type='submit'
              className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>

          <p className='mt-5 text-textColor text-center'>
            Don&apos;t have an account?{' '}
            <Link to='/register' className='text-primaryColor font-medium ml-1'>
              Register
            </Link>
          </p>
        </form> 
      </div>
    </section>
  );
};

export default Login;
