import React from "react";

const FlashCard = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg animate-slideIn">
      <p>{message}</p>
    </div>
  );
};

export default FlashCard