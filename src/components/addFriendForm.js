import React, { useState } from 'react';
import Multiselect from './Multiselect';

export default function AddFriendForm({ groups, setAddOpen, addFriend }) {
  const [nickname, setNickname] = useState('');
  const [gmail, setGmail] = useState('');
  const [group, setGroup] = useState([]);

  const handleClose = () => {
    setAddOpen(false);
  };

  const handleSubmit = () => {
    if (nickname && gmail) {
      addFriend({ name: nickname, gmail, groups: group, checked: false });
      setAddOpen(false);
    }
  };
  console.log(groups);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='md:w-1/3 sm:w-2/3 border-8 border-blue p-4 rounded shadow flex flex-col items-center bg-slate-50 relative'>
        <div className='grid grid-cols-3 w-4/5 gap-3 my-4 items-center'>
          <h2 className='text-2xl text-blue font-bold my-2 mr-auto col-span-2'>
            Add Friend
          </h2>
          <button
            onClick={handleClose}
            className='text-3xl right-3 top-2 text-blue justify-self-end'
          >
            X
          </button>
          <p className='text-lg text-blue'>Email</p>
          <input
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            placeholder='e.g. amy@gmail.com'
            type='text'
            className='rounded-md focus:border-blue border-2 border-solid focus:outline-none focus:ring-0 bg-slate-50 col-span-2 text-grey p-1'
          />
          <p className='text-lg text-blue'>Nickname</p>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder='Amy'
            type='text'
            className='rounded-md focus:border-blue border-2 border-solid focus:outline-none focus:ring-0 bg-slate-50 col-span-2 text-grey p-1'
          />
          <p className='text-lg text-blue'>Group</p>
          <div className='col-span-2'>
            <Multiselect
              list={groups}
              selectedItems={group}
              setSelected={setGroup}
              isGroup={true}
            />
          </div>
          <div></div>
          <div></div>
          <button
            onClick={handleSubmit}
            className='text-center bg-blue text-white text-xl py-1.5 px-5 rounded-md'
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
