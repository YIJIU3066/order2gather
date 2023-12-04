import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchtext, handleInputChange }) => {
  return (
    <>
      <div className='searchbar px-4 py-2 rounded-lg border-blue border-4 w-fit'>
        <label>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: '#7A989A', marginRight: '12px' }}
          />
          <input
            className='focus:outline-none'
            placeholder='SEARCH'
            value={searchtext}
            onChange={handleInputChange}
          />
        </label>
      </div>
    </>
  );
};
export default SearchBar;
