import React, { useEffect, useState } from 'react';
import { calculateWinner } from '../../utils/winner';
import Board from './Board';
import { useDispatch, useSelector } from 'react-redux';
import { updateGame } from '../../slices/games/updateGameSlice';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Game = ({ friendName }) => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const [selected, setSelected] = useState(false);
  const [winner, setWinner] = useState('');
  const xO = xIsNext ? 'X' : 'O';

  const dispatch = useDispatch();

  const gameDetails = useSelector((state) => state.getGamebyID);
  const { game } = gameDetails;

  const result = useSelector((state) => state.updateGame);
  const { success } = result;

  useEffect(() => {
    if (game) {
      setHistory(game.history);
      setStepNumber(game.stepnumber);
      setXisNext(game.xIsNext);
      setWinner(game.winner);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) window.location.reload();
  }, [success]);

  const handleClick = (i) => {
    if (
      (xIsNext &&
        JSON.parse(localStorage.getItem('userInfo')).email !==
          game.createdBy.email) ||
      (!xIsNext &&
        JSON.parse(localStorage.getItem('userInfo')).email ===
          game.createdBy.email)
    )
      return;

    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[selected ? stepNumber - 1 : stepNumber];
    const squares = [...current];

    if (squares[i] === 'X' || squares[i] === 'O')
      // return if won or occupied
      return;
    // select square
    squares[i] = xO;
    setHistory((prev) =>
      selected ? [...prev.slice(0, -1), squares] : [...prev, squares]
    );
    setStepNumber((prev) => (selected ? prev : prev + 1));
    setWinner(calculateWinner(squares));
    setSelected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (history.length === game.history.length) {
      toast.custom(
        (t) => (
          <div
            className={`w-full h-[5rem] bg-[#EB5757] flex justify-start items-center rounded-lg my-3 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 relative transition-all duration-500 ease-in-out ${
              t.visible ? 'bottom-5' : '-bottom-96'
            }`}
          >
            <h4 className="w-full text-white text-sm font-epilogue font-normal ml-3">
              Click on the square to make your move
            </h4>
          </div>
        ),
        { id: 'unique-notification', position: 'bottom-center' }
      );
      return;
    }
    dispatch(
      updateGame({
        id: game._id,
        stepnumber: stepNumber,
        history,
        xIsNext: game.xIsNext ? false : true,
        winner,
        isCompleted:
          stepNumber === 9 || winner === 'X' || winner === 'O' ? true : false,
        player: game.player,
        createdBy: game.createdBy,
      })
    );
    // if (success) window.location.reload();
  };

  const winnerName =
    winner === 'X'
      ? JSON.parse(localStorage.getItem('userInfo')).email ===
        game.createdBy.email
        ? 'You'
        : friendName
      : JSON.parse(localStorage.getItem('userInfo')).email !==
        game.createdBy.email
      ? 'You'
      : friendName;

  return (
    <div className="flex justify-center items-center flex-col mt-7">
      <div className="h-[3rem] w-[300px] bg-[#FFE79E] flex justify-center items-center">
        <p className="text-black text-sm font-epilogue">
          {game &&
            (game.isCompleted
              ? winnerName === ''
                ? 'Its a DRAW'
                : `${winnerName} WON`
              : xIsNext
              ? JSON.parse(localStorage.getItem('userInfo')).email ===
                game.createdBy.email
                ? 'Your Move'
                : 'Their Move'
              : JSON.parse(localStorage.getItem('userInfo')).email !==
                game.createdBy.email
              ? 'Your Move'
              : 'Their Move')}
        </p>
      </div>
      {game && <Board squares={history[stepNumber]} onClick={handleClick} />}

      {game && game.isCompleted ? (
        <Link className="w-full" to="/home/details">
          <button
            type="submit"
            className="w-full mt-5 text-white font-epilogue font-bold shadow-xl bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Start another Game
          </button>
        </Link>
      ) : xIsNext ? (
        game.createdBy.email ===
        JSON.parse(localStorage.getItem('userInfo')).email ? (
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full mt-7 text-white font-epilogue shadow-xl font-bold bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            className="w-full mt-7 text-white font-epilogue shadow-xl cursor-not-allowed font-bold bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
            disabled
          >
            Waiting for Opponent
          </button>
        )
      ) : game.createdBy.email !==
        JSON.parse(localStorage.getItem('userInfo')).email ? (
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full mt-7 text-white font-epilogue shadow-xl font-bold bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
          {...(game && game.isCompleted && 'disabled')}
        >
          Submit
        </button>
      ) : (
        <button
          type="submit"
          className="w-full mt-7 text-white font-epilogue shadow-xl font-bold cursor-not-allowed bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
          disabled
        >
          Waiting for Opponent
        </button>
      )}
      <Toaster />
    </div>
  );
};

export default Game;
