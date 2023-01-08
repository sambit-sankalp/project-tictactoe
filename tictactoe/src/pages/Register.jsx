import React, { useState, useEffect } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../slices/auth/registerSlice';
import { Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.username === '' ||
      user.name === '' ||
      user.email === '' ||
      user.password === ''
    ) {
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
    dispatch(register(user));
  };

  const dispatch = useDispatch();
  const result = useSelector((state) => state.register);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      window.location.href = '/home';
    }
    if (result.success) {
      toast.custom(
        (t) => (
          <div
            className={`w-full h-[5rem] bg-green-400 flex justify-start items-center rounded-lg my-3 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out ${
              t.visible ? 'bottom-5' : '-bottom-96'
            }`}
          >
            <h4 className="w-full text-white text-sm font-epilogue font-normal ml-3">
              Congratulations!!! Account created.
            </h4>
          </div>
        ),
        { id: 'unique-notification', position: 'bottom-center' }
      );
      window.location.href = '/login';
    }

    if (result.success === false && result.error !== '') {
      toast.custom(
        (t) => (
          <div
            className={`w-full h-[5rem] bg-[#EB5757] flex justify-start items-center rounded-lg my-3 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out ${
              t.visible ? 'bottom-5' : '-bottom-96'
            }`}
          >
            <h4 className="w-full text-white text-sm font-epilogue font-normal ml-3">
              Username or email already exists.
            </h4>
          </div>
        ),
        { id: 'unique-notification', position: 'bottom-center' }
      );
    }
  }, [result]);

  return (
    <div className="w-full p-4 bg-white">
      <Link to="/">
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      <form className="mt-10 w-full h-[85vh] flex justify-between items-start flex-col">
        <div className="w-full">
          <h5 className="font-extrabold font-epilogue text-sm text-gray-900">
            Create Account
          </h5>
          <h5 className="mt-2 font-extrabold font-epilogue text-3xl w-11/12 text-gray-900">
            Let’s get to know you better!
          </h5>
          <div className="mt-8">
            <label
              htmlFor="name"
              className="font-epilogue font-bold my-2 text-sm text-gray-900"
            >
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className=" bg-gray-100 my-1 font-epilogue text-gray-900 text-sm rounded-lg w-full p-2.5"
              placeholder="Type your name here"
              required
            />
          </div>
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
              htmlFor="email"
              className="block my-1 font-bold font-epilogue text-sm text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="bg-gray-100 font-light font-epilogue text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type your email here"
              required
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-sm font-epilogue text-gray-900"
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
          type="submit"
          onClick={handleSubmit}
          className="w-full text-white font-epilogue shadow-xl font-bold bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default Register;
