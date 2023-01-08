import React, { useEffect, useState } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/auth/loginSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const result = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username === '' || user.password === '') {
      toast.custom(
        (t) => (
          <div
            className={`w-full h-[5rem] bg-[#EB5757] flex justify-start items-center rounded-lg my-3 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out ${
              t.visible ? 'bottom-5' : '-bottom-96'
            }`}
          >
            <h4 className="w-full text-white text-sm font-epilogue font-normal ml-3">
              Empty fields are not allowed.
            </h4>
          </div>
        ),
        { id: 'unique-notification', position: 'bottom-center' }
      );
      return;
    }

    dispatch(login(user));
  };

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      window.location.href = '/home';
    }
    if (result.success === false) {
      toast.custom(
        (t) => (
          <div
            className={`w-full h-[5rem] bg-[#EB5757] flex justify-start items-center rounded-lg my-3 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out ${
              t.visible ? 'bottom-5' : '-bottom-96'
            }`}
          >
            <h4 className="w-full text-white text-sm font-epilogue font-normal ml-3">
              Enter correct details.
            </h4>
          </div>
        ),
        { id: 'unique-notification', position: 'bottom-center' }
      );
    }
    if (result.success === true && result.user) {
      window.location.href = '/home';
    }
  }, [result]);

  return (
    <div className="w-full p-4 bg-white">
      <Link to="/">
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      <form className="mt-10 w-full h-[85vh] flex justify-between items-start flex-col">
        <div className="w-full">
          <h5 className="font-extrabold font-epilogue text-sm text-gray-900 dark:text-white">
            Login
          </h5>
          <h5 className="mt-2 font-extrabold font-epilogue text-3xl w-11/12 text-gray-900 dark:text-white">
            Please enter your details
          </h5>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block my-1 font-bold font-epilogue text-sm text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="bg-gray-100 font-light font-epilogue text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type your username here"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-sm font-epilogue text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Type your password here"
              className="bg-gray-100 my-1 font-epilogue text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full text-white font-epilogue shadow-xl font-bold bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default Login;
