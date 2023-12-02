import React, { useEffect, useState, useContext } from 'react';
import Multiselect from './Multiselect';
import AuthContext from '../context/AuthContext';
import useAxios from '../hooks/useAxios';

const AddOrderer = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [friendList, setFriendList] = useState([]);
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const getAllFriend = async () => {
      try {
        const response = await axiosInstance.get('/friend/get');
        console.log(response);
        setFriendList(response.data.friends);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAllFriend();
  }, []);

  // 將 email 欄位的值設置為與 username 相同的值
  const updatedFriendList = friendList.map((friend) => ({
    ...friend,
    name: friend.username,
  }));

  useEffect(() => {
    console.log(friendList);
  }, [friendList]);

  return (
    <div className=''>
      <Multiselect
        list={updatedFriendList}
        selectedItems={friend}
        setSelected={setFriend}
        isGroup={false}
      />
    </div>
  );
};

export default AddOrderer;
