import React, { useEffect, useState, useContext } from 'react';

const AddOrderer = ({
  friendList,
  setFriendList,
  groupList,
  setGroupList,
  checkedList,
  setCheckedList,
}) => {
  const handleCheckboxChange = (selected, type) => {
    if (type == 'friend') {
      const updatedFriendList = friendList.map((friend) =>
        friend.id === selected.id
          ? { ...friend, checked: !friend.checked }
          : friend
      );
      setFriendList(updatedFriendList);

      const updatedCheckedFriends = updatedFriendList
        .filter((friend) => friend.checked)
        .map((friend) => ({ id: friend.id, username: friend.username }));

      const updatedCheckedGroups = checkedList.groups || [];

      setCheckedList({
        friends: updatedCheckedFriends,
        groups: updatedCheckedGroups,
      });
    }
    if (type == 'group') {
      const updatedGroupList = groupList.map((group) =>
        group.gid === selected.gid
          ? { ...group, checked: !group.checked }
          : group
      );
      setGroupList(updatedGroupList);

      const updatedCheckedGroups = updatedGroupList
        .filter((group) => group.checked)
        .map((group) => ({ gid: group.gid, name: group.name }));

      const updatedCheckedFriends = checkedList.friends || [];

      setCheckedList({
        friends: updatedCheckedFriends,
        groups: updatedCheckedGroups,
      });
    }
  };

  return (
    <div className='absolute left-full flex '>
      {friendList && (
        <div
          className='w-max mx-2 shadow-md bg-slate-50 rounded'
          onClick={(e) => e.stopPropagation}
        >
          <ul className='flex flex-col justify-center items-center rounded'>
            <li className='bg-blue w-full flex justify-center items-center text-white  font-semibold px-2 py-1 rounded-t'>
              Friends
            </li>
            {friendList.length != 0 &&
              friendList.map((friend) => (
                <li
                  className='checkbox-wrapper text-base w-full font-semibold m-2 cursor-pointer flex justify-start items-center text-gray-700'
                  key={friend.id}
                >
                  <label className='cursor-pointer flex items-center justify-center'>
                    <input
                      id='red-checkbox'
                      type='checkbox'
                      checked={friend.checked}
                      className='appearance-none w-4 h-4 mx-2 rounded focus:outline-none border-2 cursor-pointer border-blue checked:bg-blue'
                      onChange={() => handleCheckboxChange(friend, 'friend')}
                    />
                    <div className='flex justify-center text-base'>
                      {friend.nickname ? friend.nickname : friend.username}
                    </div>
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}
      {groupList && (
        <div
          className='w-max mx-2 shadow-md bg-slate-50 rounded'
          onClick={(e) => e.stopPropagation}
        >
          <ul className='flex flex-col justify-center items-center'>
            <li className='bg-green w-full flex justify-center items-center text-white  font-semibold px-2 py-1 rounded-t'>
              Group
            </li>

            {groupList.length != 0 &&
              groupList.map((group) => (
                <li
                  className='checkbox-wrapper text-base w-full font-semibold m-2 cursor-pointer flex justify-start items-center text-gray-700'
                  key={group.gid}
                >
                  <label className='cursor-pointer flex items-center justify-center'>
                    <input
                      type='checkbox'
                      checked={group.checked}
                      className='appearance-none w-4 h-4 mx-2 rounded focus:outline-none border-2 cursor-pointer border-blue checked:bg-blue'
                      onChange={() => handleCheckboxChange(group, 'group')}
                    />
                    <div className='flex justify-center text-base'>
                      {group.name}
                    </div>
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddOrderer;
