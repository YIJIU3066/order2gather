import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import AddItem from '../components/addItem';
import AddGroupForm from '../components/addGroupForm';
import ListNav from '../components/listNav';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

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
    id: 1,
  },
  {
    name: 'Jesse',
    gmail: 'yoyoyo@gmail.com',
    groups: [
      { name: 'Cook', id: 1 },
      { name: 'Gang', id: 4 },
    ],
    checked: false,
    id: 2,
  },
  {
    name: 'Gus',
    gmail: 'lospoloshermanos@gmail.com',
    groups: [
      { name: 'Boss', id: 3 },
      { name: 'Chicken', id: 5 },
    ],
    checked: false,
    id: 3,
  },
  {
    name: 'Skyler',
    gmail: 'mynameisskylerwhiteyo@gmail.com',
    groups: [],
    checked: false,
    id: 4,
  },
  {
    name: 'Saul',
    gmail: 'bettercallsaul@gmail.com',
    groups: [{ name: 'Lawyer', id: 6 }],
    checked: false,
    id: 5,
  },
  {
    name: 'Hank',
    gmail: 'coolmineral@gmail.com',
    groups: [{ name: 'DEA', id: 7 }],
    checked: false,
    id: 6,
  },
  {
    name: 'Mike',
    gmail: 'waltuh@gmail.com',
    groups: [{ name: 'Chicken', id: 5 }],
    checked: false,
    id: 7,
  },
];

const mockGroups = [
  { name: 'Cook', checked: false, id: 1 },
  { name: 'Teacher', checked: false, id: 2 },
  { name: 'Boss', checked: false, id: 3 },
  { name: 'Gang', checked: false, id: 4 },
  { name: 'Chicken', checked: false, id: 5 },
  { name: 'Lawyer', checked: false, id: 6 },
  { name: 'DEA', checked: false, id: 7 },
];

export default function GroupList() {
  const [groupList, setGroupList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [showGroups, setShowGroups] = useState([0, 5]);
  const [addOpen, setAddOpen] = useState(false);
  const api = useAxios();

  const fetchGroupList = async () => {
    const res = await api.get('/friend/get');
    let newGList = [],
      newFList = [];
    for (const g of res.data.groups) {
      newGList.push({
        name: g.name,
        checked: false,
        id: g.gid,
      });
    }
    for (const f of res.data.friends) {
      newFList.push({
        ...f,
        name: f.nickname,
        checked: false,
      });
    }
    setGroupList(newGList);
    setFriendList(newFList);
    console.log(res.data.friends);
  };

  const handleClick = (e) => {
    const key = e.target.value;
    setGroupList((prevList) => {
      let newList = [];
      prevList.forEach((it) => {
        if (it.id === parseInt(key))
          newList.push({ ...it, checked: !it.checked });
        else newList.push(it);
      });
      return newList;
    });
  };

  const handleDelete = () => {
    setGroupList(groupList.filter((it) => !it.checked));
  };

  const addGroup = async ({ groupName, friend }) => {
    const res = await api.post(
      '/friend/createGroup',
      JSON.stringify({
        name: groupName,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.status === 200) {
      let fidList = [];
      for (const f of friend) fidList.push(f.id);
      console.log(fidList, res.data.gid);
      const resp = await api.post(
        '/friend/addUsersToGroup',
        JSON.stringify({
          fids: fidList,
          gid: res.data.gid,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(resp);
    }
    fetchGroupList();
  };

  useEffect(() => {
    fetchGroupList();
  }, []);

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-blue font-bold text-4xl p-10'>Group</h1>
        <div className='w-full grid grid-cols-5 gap-2 px-[10vw] justify-items-center items-center'>
          <AddItem onClick={() => setAddOpen(true)} hintText='Add New Group!' />
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <>
            {groupList.map((group, index) => {
              if (index < showGroups[1] && index >= showGroups[0]) {
                return (
                  <>
                    <input
                      type='checkbox'
                      value={group.id}
                      checked={group.checked}
                      onChange={handleClick}
                      className='accent-blue w-4 h-4 border-blue'
                    />
                    <Link
                      to={`/groupDetail/${group.id}`}
                      state={{ group: group, friendList: friendList }}
                      className='text-2xl text-blue font-bold justify-self-start col-span-4 p-4'
                    >
                      <div>
                        <p>{group.name}</p>
                      </div>
                    </Link>
                  </>
                );
              }
            })}
          </>
          <div></div>
          <div></div>
          <button
            className='h-10 w-32 text-white text-xl font-bold bg-red rounded-lg'
            onClick={handleDelete}
          >
            Delete
          </button>
          <div></div>
          <ListNav
            showIndex={showGroups}
            setShowIndex={setShowGroups}
            len={groupList.length}
          />
        </div>
      </div>
      {addOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 duration-100'>
          <AddGroupForm
            friends={friendList}
            setAddOpen={setAddOpen}
            addGroup={addGroup}
          />
        </div>
      )}
    </>
  );
}
