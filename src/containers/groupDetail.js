import React, { useState, useLayoutEffect } from 'react'
import Navbar from "../components/navbar"
import { useLocation, Link } from "react-router-dom";
import ListNav from "../components/listNav"
import Multiselect from '../components/Multiselect';

export default function GroupDetail() {

    const location = useLocation();
    const { group, friendList } = location.state || {};
    const [showMembers, setShowMembers] = useState([0, 5]);
    const [memberList, setMemberList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState([]);

    useLayoutEffect(() => {
        for (let i = 0; i < friendList.length; i++) {
            for (let j = 0; j < friendList[i].groups.length; j++) {
                if (friendList[i].groups[j].id === group.id && !memberList.includes(friendList[i])) {
                    setMemberList(prevList => [...prevList, friendList[i]]);
                }
            }
        }
        return () => setMemberList([]);
    }, [])

    const addSelectedFriend = () => {
        selectedFriend.forEach(it => {
            if (!memberList.includes(it)) {
                setMemberList(prevList => [...prevList, it]);
            }
        })
        setSelectedFriend([])
    }

    const handleClick = (e) => {
        const key = e.target.value;
        console.log(key)
        setMemberList((prevList) => {
            let newList = []
            prevList.forEach(it => {
                console.log(it.id, key)
                if (it.id === parseInt(key)) newList.push({...it, checked: !it.checked});
                else newList.push(it);
            })
            return newList
        })
    }  
    console.log(selectedFriend)

    const handleDelete = () => {
        setMemberList(prevList => prevList.filter((it) => it.checked === false))
    }

    return (
    <>
        <Navbar />
        <div className='flex w-full items-center justify-center flex-col'>
            <p className="text-blue text-4xl font-bold m-6">{group.name}</p>
            <div className='my-4 flex items-center md:w-[60vw] sm:w-[80vw] xs:w-[90vw] gap-6'>
                <p className="text-blue text-2xl font-bold">Add to Group</p>
                <div className="w-60">
                    <Multiselect list={friendList} selectedItems={selectedFriend} setSelected={setSelectedFriend} isGroup={false} />
                </div>
            </div>
            <div>
                {
                    memberList.map((member, index) => {
                        if (index < showMembers[1] && index >= showMembers[0]) { 
                            return (
                                <div className='grid grid-cols-5 gap-2 md:w-[60vw] sm:w-[80vw] xs:w-[90vw] items-center'>
                                    <input type="checkbox" onClick={handleClick} value={member.id} checked={member.checked} className="accent-blue w-4 h-4 border-blue my-4"/>
                                    <p className="text-2xl text-blue font-bold">{member.name}</p>
                                    <p className="text-xl text-blue col-span-2">{member.gmail}</p>
                                    <div></div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="w-4/5 grid grid-cols-3 gap-2 px-[10vw] justify-items-center pt-10">
                <button className='h-10 w-32 text-white text-xl font-bold bg-yellow rounded-lg' onClick={addSelectedFriend}>Finish</button>
                <button className='h-10 w-32 text-white text-xl font-bold bg-red rounded-lg ' onClick={handleDelete}>Delete</button>
                <ListNav showIndex={showMembers} setShowIndex={setShowMembers} len={memberList.length}/>
            </div>
        </div>
    </>
    )
}
