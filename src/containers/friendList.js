import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import ListNav from '../components/listNav';
import AddFriendForm from '../components/addFriendForm';
import AddItem from '../components/addItem';
import useAxios from '../hooks/useAxios';

export default function FriendList() {
  const [friendList, setFriendList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [showFriends, setShowFriends] = useState([0, 5]);
  const [addOpen, setAddOpen] = useState(false);
  const api = useAxios();

  const fetchFriendList = async () => {
    const res = await api.get('/friend/get');
    console.log(res.data.groups, res.data.friends);
    let newList = [];
    for (const f of res.data.friends) {
      newList.push({
        name: f.nickname,
        gmail: f.email,
        groups: [],
        checked: false,
        id: f.id,
      });
    }
    for (const g of res.data.groups) {
      const resp = await api.get('/friend/getGroupInfo', {
        params: {
          id: g.gid,
        },
      });
      for (const f of newList) {
        for (const m of resp.data.members) {
          if (m.id === f.id) {
            f.groups.push({ name: g.name, id: g.gid });
          }
        }
      }
    }
    setFriendList(newList);

    let gList = [];
    for (const g of res.data.groups) {
      gList.push({
        name: g.name,
        id: g.gid,
        role: g.role,
      });
    }
    setGroupList(gList);
  };

  useEffect(() => {
    fetchFriendList();
  }, []);

  const addFriend = async (newFriend) => {
    const res = await api.post(
      '/friend/add',
      JSON.stringify({
        email: newFriend.gmail,
        nickname: newFriend.name,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status === 200 && res.data.status) {
      const resp = await api.get('/friend/get');
      let fidList = [];
      for (const f of resp.data.friends) {
        if (f.email === newFriend.gmail) {
          fidList.push(f.id);
          break;
        }
      }
      for (const g of newFriend.groups) {
        const res = await api.post(
          '/friend/addUsersToGroup',
          JSON.stringify({
            fids: fidList,
            gid: g.id,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(fidList, g.id, res.data.status);
      }
      fetchFriendList();
    } else alert('Add Friend Failed');
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

  const handleDelete = async () => {
    let deleteList = [];
    for (const f of friendList) {
      if (f.checked) {
        deleteList.push(f.id);
      }
    }
    console.log(deleteList);
    for (const d of deleteList) {
      const res = await api.post('/friend/delete', 
        JSON.stringify({
          fid: d,
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    fetchFriendList();
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
            groups={groupList}
            setAddOpen={setAddOpen}
            addFriend={addFriend}
          />
        </div>
      )}
    </>
  );
}
