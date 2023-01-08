import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button
      className="bg-[#fff] border-none cursor-pointer outline-none flex justify-center items-center"
      onClick={onClick}
    >
      {value &&
        (value === 'X' ? (
          <img
            className="w-1/2 h-1/2"
            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1671540910/x_uuo5tv.png"
            alt={value}
          />
        ) : (
          value === 'O' && (
            <img
              className="w-1/2 h-1/2"
              src="https://res.cloudinary.com/sambitsankalp/image/upload/v1671540910/o_nui4sv.png"
              alt={value}
            />
          )
        ))}
    </button>
  );
};

export default Square;
