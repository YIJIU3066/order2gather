import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import ListNav from '../components/listNav';
import AddFriendForm from '../components/addFriendForm';
import AddItem from '../components/addItem';

const mockGroups = [
  { name: 'Cook', id: 1 },
  { name: 'Teacher', id: 2 },
  { name: 'Boss', id: 3 },
  { name: 'Gang', id: 4 },
  { name: 'Chicken', id: 5 },
  { name: 'Lawyer', id: 6 },
  { name: 'DEA', id: 7 },
];

const mockFriends = [
  {
    name: 'Walter',
    gmail: 'chemistryisart@gmail.com',
    groups: [
      { name: 'Cook', id: 1 },
      { name: 'Teacher', id: 2 },
      { name: 'Boss', id: 3 },
    ],
    checked: false,
  },
  {
    name: 'Jesse',
    gmail: 'yoyoyo@gmail.com',
    groups: [
      { name: 'Cook', id: 1 },
      { name: 'Gang', id: 4 },
    ],
    checked: false,
  },
  {
    name: 'Gus',
    gmail: 'lospoloshermanos@gmail.com',
    groups: [
      { name: 'Boss', id: 3 },
      { name: 'Chicken', id: 5 },
    ],
    checked: false,
  },
  {
    name: 'Skyler',
    gmail: 'mynameisskylerwhiteyo@gmail.com',
    groups: [],
    checked: false,
  },
  {
    name: 'Saul',
    gmail: 'bettercallsaul@gmail.com',
    groups: [{ name: 'Lawyer', id: 6 }],
    checked: false,
  },
  {
    name: 'Hank',
    gmail: 'coolmineral@gmail.com',
    groups: [{ name: 'DEA', id: 7 }],
    checked: false,
  },
  {
    name: 'Mike',
    gmail: 'waltuh@gmail.com',
    groups: [{ name: 'Chicken', id: 5 }],
    checked: false,
  },
];

export default function FriendList() {
  const [friendList, setFriendList] = useState([]);
  const [showFriends, setShowFriends] = useState([0, 5]);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    setFriendList(mockFriends);
  }, []);

  const addFriend = (newFriend) => {
    setFriendList((prevList) => [...prevList, newFriend]);
  };

  const handleClick = (e) => {
    const key = e.target.value;
    setFriendList((prevList) => {
      let newList = [];
      prevList.forEach((it) => {
        if (it.gmail === key) newList.push({ ...it, checked: !it.checked });
        else newList.push(it);
      });
      return newList;
    });
  };

  const handleClickAdd = () => {
    setAddOpen(true);
  };

  const handleDelete = () => {
    setFriendList(friendList.filter((it) => !it.checked));
  };

  return (
    <>
      <Navbar />
      <div className='flex p-10 items-center justify-center'>
        <h2 className='text-blue font-bold text-4xl'>Friend</h2>
      </div>
      <div className='grid grid-cols-5 gap-2 px-[10vw] justify-items-center'>
        <AddItem onClick={handleClickAdd} hintText='Add New Friend!' />
        <p className='text-2xl font-bold text-blue'>Nickname</p>
        <p className='text-2xl font-bold text-blue'>Gmail</p>
        <p className='text-2xl font-bold text-blue'>In Group</p>
        <ListNav
          showIndex={showFriends}
          setShowIndex={setShowFriends}
          len={friendList.length}
        />
      </div>
      <hr className='my-2 h-0.5 mx-[10vw] border-t-0 bg-grey opacity-20' />
      <>
        {friendList.map((friend, index) => {
          if (index < showFriends[1] && index >= showFriends[0]) {
            return (
              <>
                <div className='grid grid-cols-5 gap-2 px-[10vw] justify-items-center items-center'>
                  <input
                    type='checkbox'
                    value={friend.gmail}
                    checked={friend.checked}
                    onChange={handleClick}
                    className='accent-blue w-4 h-4 border-blue'
                  />
                  <p className='text-xl text-blue font-bold'>{friend.name}</p>
                  <p className='text-lg break-all text-blue'>{friend.gmail}</p>
                  <div className='flex flex-wrap'>
                    {friend.groups.map((group) => {
                      return (
                        <div
                          className='bg-yellow text-white rounded-lg p-1 m-1 font-bold text-center'
                          key={index}
                        >
                          {group.name}
                        </div>
                      );
                    })}
                  </div>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    style={{ color: '#7A989A' }}
                    size='xl'
                  />
                </div>
                <hr className='my-2 h-0.5 mx-[10vw] border-t-0 bg-grey opacity-20' />
              </>
            );
          }
        })}
      </>
      <div className='grid grid-cols-5 gap-2 px-[10vw] justify-items-center'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <ListNav
          showIndex={showFriends}
          setShowIndex={setShowFriends}
          len={friendList.length}
        />
      </div>
      <div className='grid grid-cols-2 gap-2 px-[10vw] justify-items-center pt-5'>
        <button className='h-10 w-32 text-white text-xl font-bold bg-yellow rounded-lg'>
          Finish
        </button>
        <button
          className='h-10 w-32 text-white text-xl font-bold bg-red rounded-lg'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {addOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <AddFriendForm
            groups={mockGroups}
            setAddOpen={setAddOpen}
            addFriend={addFriend}
          />
        </div>
      )}
    </>
  );
}
