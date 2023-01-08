import React, { useEffect } from 'react';
import Game from '../components/Playground/Game';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameByID } from '../slices/games/getGameByIdSlice';
import Loader from '../components/Loader';

const Playground = () => {
  const { id } = useParams();

  const result = useSelector((state) => state.getGamebyID);
  const { loading, error, game } = result;

  const dispatch = useDispatch();

  const { createdBy, player } = game;

  useEffect(() => {
    dispatch(getGameByID(id));
  }, [dispatch, id]);


  return (
    <div className="w-full p-3 bg-white">
      <Link to="/home">
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        game && createdBy && player && (
          <>
            <h5 className="mt-6 font-bold font-epilogue text-2xl text-gray-900">
              Game with{' '}
              {JSON.parse(localStorage.getItem('userInfo')).email ===
              createdBy.email
                ? player.name
                : createdBy.name}
            </h5>
            <h5 className="font-normal mt-2 font-epilogue text-sm text-gray-900">
              Your Piece
            </h5>
            <img
              className="w-10 h-10 m-2"
              src={
                JSON.parse(localStorage.getItem('userInfo')).email ===
                createdBy.email
                  ? 'https://res.cloudinary.com/sambitsankalp/image/upload/v1671540910/x_uuo5tv.png'
                  : 'https://res.cloudinary.com/sambitsankalp/image/upload/v1671540910/o_nui4sv.png'
              }
              alt="X"
            />

            {game && (
              <Game
                friendName={
                  JSON.parse(localStorage.getItem('userInfo')).email ===
                  createdBy.email
                    ? player.name
                    : createdBy.name
                }
              />
            )}
          </>
        )
      )}
    </div>
  );
};

export default Playground;
