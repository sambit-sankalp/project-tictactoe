import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ game }) => {
  const { player, createdBy, updatedAt, xIsNext, _id, isCompleted, winner } =
    game;

  const friend =
    JSON.parse(localStorage.getItem('userInfo')).email === createdBy.email
      ? player
      : createdBy;

  const winnerName =
    winner === 'X'
      ? JSON.parse(localStorage.getItem('userInfo')).email === createdBy.email
        ? 'You'
        : friend.name
      : JSON.parse(localStorage.getItem('userInfo')).email !== createdBy.email
      ? 'You'
      : friend.name;

  return (
    <>
      <div className="max-w-sm p-2 my-2 pl-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <a href="/">
          <h5 className="mb-2 text-2xl font-epilogue font-bold tracking-tight text-gray-900">
            Game with {friend.name}
          </h5>
        </a>
        <p className="mb-3 text-xm font-normal font-epilogue text-gray-700">
          {game &&
            (isCompleted
              ? winner === ''
                ? 'Its a DRAW'
                : `${winnerName} WON`
              : xIsNext
              ? createdBy.email === JSON.parse(localStorage.getItem('userInfo')).email
                ? `${friend.name} just made their move! It’s your turn to play now.`
                : 'You’ve made your move! Waiting for them.'
              : createdBy.email !== JSON.parse(localStorage.getItem('userInfo')).email
              ? `${friend.name} just made their move! It’s your turn to play now.`
              : 'You’ve made your move! Waiting for them.')}
        </p>
        <p className="mb-3 text-xs font-normal font-epilogue text-gray-700">
          {new Date(updatedAt).toLocaleString()}
        </p>
        <Link className="w-full" to={`/home/play/${_id}`}>
          <button
            type="submit"
            className="w-full text-white font-epilogue shadow-xl font-bold bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {game &&
              (isCompleted
                ? 'View Game'
                : xIsNext
                ? createdBy.email ===
                  JSON.parse(localStorage.getItem('userInfo')).email
                  ? `Play`
                  : 'View Game'
                : createdBy.email !==
                  JSON.parse(localStorage.getItem('userInfo')).email
                ? `Play`
                : 'View Game')}
            {}
          </button>
        </Link>
      </div>
    </>
  );
};

export default Card;
