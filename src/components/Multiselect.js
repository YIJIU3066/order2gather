import React, { useState } from 'react';
import Dropdown from './Dropdown';


const Multiselect = ({ list, selectedItems, setSelected, isGroup }) => {
    const [dropdown, setDropdown] = useState(false);


    const toogleDropdown = () => {
        setDropdown(!dropdown)
    };
    const addTag = (item) => {
        for (let i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i].id === item.id) {
                setSelected(prevList => [...prevList.slice(0, i), ...prevList.slice(i + 1)])
                return;
            }
        }
        setSelected([...selectedItems, item])
    };

    return (
        <div className="w-full autcomplete-wrapper relative">
            <div className="w-full autcomplete">
                <div className="w-full flex flex-col items-center mx-auto">
                    <div className="w-full">
                        <div className="w-full flex flex-col items-center relative">
                            <div className="w-full ">
                                <div className="w-full my-2 p-1 flex border border-gray-200 bg-slate-50 rounded ">
                                    <div className="w-full flex flex-auto flex-wrap">
                                        { !isGroup && !selectedItems.length && <p className="my-auto mx-1 text-grey opacity-50 text-lg font-medium">Select Friend</p>}
                                        { isGroup && !selectedItems.length && <p className="my-auto mx-1 text-grey opacity-50 text-lg font-medium">Select Group</p>}
                                        { isGroup && 
                                            selectedItems.map((tag, index) => {
                                                if (index < 2) {
                                                    return (
                                                        <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-lg text-white bg-green">
                                                                <div className="text-xs font-normal leading-none max-w-full flex-initial">{ tag.name }</div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        { !isGroup && 
                                            selectedItems.map((tag, index) => {
                                                if (index < 3) {
                                                    return (
                                                        <div key={index} className={"flex justify-center items-center my-auto font-bold h-6 w-6 rounded-full border-green border border-[3px] text-grey bg-slate-50 " + ((index === 1) ? "-translate-x-2" : ((index === 2) ? "-translate-x-4" : ""))}>
                                                                <div className="text-xs leading-none max-w-full flex-initial">{ tag.name[0] }</div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        { isGroup && 
                                            selectedItems.length > 2 ? 
                                            <div className="flex justify-center items-center m-1 text-sm font-medium py-0.5 px-1 rounded-lg text-white bg-green">
                                                {
                                                    selectedItems.length > 2 ? `+${selectedItems.length - 2}` : null
                                                }
                                            </div> : null
                                        }
                                        { !isGroup && 
                                            selectedItems.length > 3 ? 
                                            <div className="flex justify-center items-center my-auto text-xs font-medium h-6 w-6 -translate-x-6 bg-slate-50 rounded-full text-grey border-green border border-[3px]">
                                                {
                                                    selectedItems.length > 2 ? `+${selectedItems.length - 3}` : null
                                                }
                                            </div> : null
                                        }
                                    </div>
                                    <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={toogleDropdown}>
                                        <button className="cursor-pointer w-6 h-6 text-blue outline-none focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                                <polyline points="18 15 12 9 6 15"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { dropdown  ? <Dropdown list={list} selected={selectedItems} addItem={addTag}></Dropdown> : null }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Multiselect;