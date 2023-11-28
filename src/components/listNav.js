import React from 'react';

export default function ListNav({ showIndex, setShowIndex, len }) {
  const handleNextPage = () => {
    if (showIndex[0] + 5 < len) {
      setShowIndex((prevList) => prevList.map((it) => it + 5));
    }
  };

  const handlePrevPage = () => {
    if (showIndex[0] > 0) {
      setShowIndex((prevList) => prevList.map((it) => it - 5));
    }
  };

  return (
    <div>
      <button className='text-3xl font-bold text-blue' onClick={handlePrevPage}>
        {'<'}&nbsp;
      </button>
      <button className='text-3xl font-bold text-blue' onClick={handleNextPage}>
        &nbsp;{'>'}
      </button>
    </div>
  );
}
