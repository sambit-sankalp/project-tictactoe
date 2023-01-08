import React, { useEffect, useState } from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { createGame } from '../slices/games/createGameslice';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const GameDetails = () => {
  const [email, setemail] = useState('');

  const dispatch = useDispatch();
  const result = useSelector((state) => state.createGame);
  const { error, success, game: data } = result;

  const { existing, game } = data;

  useEffect(() => {
    if (success && existing === false)
      window.location.href = `/home/play/${game._id}`;

    if (success === true && existing === true) {
      toast.custom(
        (t) => (
          <div
            className={`w-full h-[5rem] bg-[#EB5757] flex justify-start items-center rounded-lg my-3 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out ${
              t.visible ? 'bottom-5' : '-bottom-96'
            }`}
          >
            <h4 className="w-full text-white text-sm font-epilogue font-normal ml-3">
              Already a game running. Click{' '}
              <Link
                style={{ textDecoration: 'underline' }}
                to={`/home/play/${game._id}`}
              >
                link
              </Link>{' '}
              to join.
            </h4>
          </div>
        ),
        { id: 'unique-notification', position: 'bottom-center' }
      );
    }

    if (success === false && error) {
      toast.custom(
        (t) => (
          <div
            className={`w-full h-[5rem] bg-[#EB5757] flex justify-start items-center rounded-lg my-3 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out ${
              t.visible ? 'bottom-5' : '-bottom-96'
            }`}
          >
            <h4 className="w-full text-white text-sm font-epilogue font-normal ml-3">
              Email not found. Please check the email and try again.
            </h4>
          </div>
        ),
        { id: 'unique-notification', position: 'bottom-center' }
      );
    }
  }, [success, game, error, existing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame(email));
  };

  return (
    <div className="w-full p-4 bg-white">
      <Link to="/home">
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      <form className="mt-10 w-full h-[85vh] flex justify-between items-start flex-col">
        <div className="w-full">
          <h5 className="font-extrabold font-epilogue text-sm text-gray-900">
            Start a new game
          </h5>
          <h5 className="mt-2 font-extrabold font-epilogue text-3xl w-11/12 text-gray-900">
            Whom do you want to play with?
          </h5>
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
              onChange={(e) => setemail(e.target.value)}
              className="bg-gray-100 font-light font-epilogue text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type player email here"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full text-white font-epilogue shadow-xl font-bold bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Start Game
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default GameDetails;
