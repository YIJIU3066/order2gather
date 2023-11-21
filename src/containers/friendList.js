import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const mockFriends = [
    {nickname: 'Walter', gmail: "chemistryisart@gmail.com", groups: ["Cook", "Teacher", "Boss"], checked: false},
    {nickname: 'Jesse', gmail: "yoyoyo@gmail.com", groups: ["Cook", "Gang"], checked: false},
    {nickname: 'Chicken Man', gmail: "lospoloshermanos@gmail.com", groups: ["Boss"], checked: false},
    {nickname: 'Skyler', gmail: "mynameisskylerwhiteyo@gmail.com", groups: [], checked: false},
    {nickname: 'Saul', gmail: "bettercallsaul@gmail.com", groups: ["Lawyer"], checked: false}
]

export default function FriendList() {

    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        setFriendList(mockFriends);
    }, [])

    const handleClick = (e) => {
        const key = e.target.value;
        setFriendList((prevList) => {
            let newList = []
            prevList.forEach(it => {
                if (it.gmail === key) newList.push({...it, checked: !it.checked});
                else newList.push(it);
            })
            return newList
        })
    }

    return (
        <>
            <Navbar />
            <div className="flex p-10 items-center justify-center">
                <h2 className="text-blue font-bold text-4xl">Friend</h2>
            </div>
            <div className="grid grid-cols-5 gap-2 px-[10vw] justify-items-center">
                <button>
                    <div className="min-w-fit text-3xl text-white bg-yellow w-8 h-8 rounded-full flex items-center justify-center">
                        <p className="mb-2">+</p>
                    </div>
                </button>
                <p className="text-2xl font-bold text-blue">Nickname</p>
                <p className="text-2xl font-bold text-blue">Gmail</p>
                <p className="text-2xl font-bold text-blue">In Group</p>
                <div>
                    <button className="text-3xl font-bold text-blue">{"<"}</button>
                    <button className="text-3xl font-bold text-blue">&nbsp; {">"}</button>
                </div>
            </div>
            <hr class="my-2 h-0.5 mx-[10vw] border-t-0 bg-grey opacity-20" />
            <>
                {
                    friendList.map((friend) => {
                        return (
                            <>
                                <div class="grid grid-cols-5 gap-2 px-[10vw] justify-items-center items-center">
                                    <input type="checkbox" value={friend.gmail} checked={friend.checked} onChange={handleClick} className="accent-blue w-4 h-4 border-blue" />
                                    <p className="text-xl text-blue font-bold">{friend.nickname}</p>
                                    <p className="text-lg break-all text-blue">{friend.gmail}</p>
                                    <div className="flex flex-wrap">
                                        {
                                            friend.groups.map((group) => {
                                                return (<div className="bg-yellow text-white rounded-lg p-1 m-1 font-bold text-center">{group}</div>)
                                            })
                                        }
                                    </div>
                                    <FontAwesomeIcon icon={faUserGroup} style={{color: "#7A989A"}} size="xl" />
                                </div>
                                <hr class="my-2 h-0.5 mx-[10vw] border-t-0 bg-grey opacity-20" />
                            </>
                        )
                    })
                }
            </>
            <div className="grid grid-cols-5 gap-2 px-[10vw] justify-items-center">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button className="text-3xl font-bold text-blue">{"<"}</button>
                    <button className="text-3xl font-bold text-blue">&nbsp; {">"}</button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 px-[10vw] justify-items-center pt-5">
                <button className='h-10 w-32 text-white text-xl font-bold bg-yellow rounded-lg'>Finish</button>
                <button className='h-10 w-32 text-white text-xl font-bold bg-red rounded-lg'>Delete</button>
            </div>
        </>
    )
}
