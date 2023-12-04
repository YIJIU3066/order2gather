import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useLocation, Link } from 'react-router-dom';
import ListNav from '../components/listNav';
import Multiselect from '../components/Multiselect';
import useAxios from '../hooks/useAxios';

export default function GroupDetail() {
  const location = useLocation();
  const { group, friendList } = location.state || {};
  const [showMembers, setShowMembers] = useState([0, 5]);
  const [memberList, setMemberList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const api = useAxios();

  const getGroupInfo = async () => {
    const res = await api.get('/friend/getGroupInfo', {
      params: {
        id: group.id,
      },
    });
    let memList = [];
    for (const m of res.data.members) memList.push({ ...m, checked: false });
    setMemberList(memList);
  };

  useEffect(() => {
    getGroupInfo();
  }, []);

  const addSelectedFriend = async () => {
    let fidList = [];
    if (selectedFriend.length == 0) return;
    for (const f of selectedFriend) fidList.push(f.id);
    console.log(fidList, group.id);

    const res = await api.post(
      '/friend/addUsersToGroup',
      JSON.stringify({
        fids: fidList,
        gid: group.id,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setSelectedFriend([]);
    getGroupInfo();
  };

  const handleClick = (e) => {
    const key = e.target.value;
    console.log(key);
    setMemberList((prevList) => {
      let newList = [];
      prevList.forEach((it) => {
        console.log(it.id, key);
        if (it.id === parseInt(key))
          newList.push({ ...it, checked: !it.checked });
        else newList.push(it);
      });
      return newList;
    });
  };
  console.log(selectedFriend);

  const handleDelete = async () => {
    let deleteList = [];
    for (const mem of memberList) {
      if (mem.checked) {
        deleteList.push(mem.id);
      }
    }
    console.log(deleteList);
    for (const mem of deleteList) {
      const res = await api.post('/friend/removeUserFromGroup', 
        JSON.stringify({
          fid: mem,
          gid: group.id
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
        console.log(res.data.status)
    }
    getGroupInfo();
  };

  return (
    <>
      <Navbar />
      <div className='flex w-full items-center justify-center flex-col'>
        <p className='text-blue text-4xl font-bold m-6'>{group.name}</p>
        <div className='my-4 flex items-center md:w-[60vw] sm:w-[80vw] xs:w-[90vw] gap-6'>
          <p className='text-blue text-2xl font-bold'>Add to Group</p>
          <div className='w-60'>
            <Multiselect
              list={friendList}
              selectedItems={selectedFriend}
              setSelected={setSelectedFriend}
              isGroup={false}
            />
          </div>
        </div>
        <div>
          {memberList.map((member, index) => {
            if (index < showMembers[1] && index >= showMembers[0]) {
              return (
                <div
                  className='grid grid-cols-5 gap-2 md:w-[60vw] sm:w-[80vw] xs:w-[90vw] items-center'
                  key={index}
                >
                  <input
                    type='checkbox'
                    onClick={handleClick}
                    value={member.id}
                    checked={member.checked}
                    className='accent-blue w-4 h-4 border-blue my-4'
                    key={index}
                  />
                  <p className='text-2xl text-blue font-bold' key={index}>
                    {member.username}
                  </p>
                  <p className='text-xl text-blue col-span-2' key={index}>
                    {member.email}
                  </p>
                  <div key={index}></div>
                </div>
              );
            }
          })}
        </div>
        <div className='w-4/5 grid grid-cols-3 gap-2 px-[10vw] justify-items-center pt-10'>
          <button
            className='h-10 w-32 text-white text-xl font-bold bg-yellow rounded-lg'
            onClick={addSelectedFriend}
          >
            Finish
          </button>
          <button
            className='h-10 w-32 text-white text-xl font-bold bg-red rounded-lg '
            onClick={handleDelete}
          >
            Delete
          </button>
          <ListNav
            showIndex={showMembers}
            setShowIndex={setShowMembers}
            len={memberList.length}
          />
        </div>
      </div>
    </>
  );
}