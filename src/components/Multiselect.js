import React, { useState } from 'react';
import Dropdown from './Dropdown';


const Multiselect = ({ list, selectedItems, setSelected }) => {
    const [dropdown, setDropdown] = useState(false);
    const [items, setItems] = useState([...list]);


    const toogleDropdown = () => {
        setDropdown(!dropdown)
    };
    
    const addTag = (item) => {
        if (!selectedItems.includes(item)) setSelected(selectedItems.concat(item));
    };
    
    const removeTag = (item) => {
        const filtered = selectedItems.filter((e) => e !== item);
        setSelected(filtered);
    }

    return (
        <div className="w-full autcomplete-wrapper">
            <div className="w-full autcomplete">
                <div className="w-full flex flex-col items-center mx-auto">
                    <div className="w-full">
                        <div className="w-full flex flex-col items-center relative">
                            <div className="w-full ">
                                <div className="w-full my-2 p-1 flex border border-gray-200 bg-slate-50 rounded ">
                                    <div className="w-full flex flex-auto flex-wrap">
                                        {
                                            selectedItems.map((tag, index) => {
                                                if (index < 2) {
                                                    return (
                                                        <div key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-lg text-white bg-green">
                                                                <div className="text-xs font-normal leading-none max-w-full flex-initial">{ tag }</div>
                                                                <div className="flex flex-auto flex-row-reverse">
                                                                    <div onClick={() => removeTag(tag)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                                                                        className="feather feather-x cursor-pointer hover:text-red rounded-full w-4 h-4 ml-2">
                                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        {
                                            selectedItems.length > 2 ? 
                                            <div className="flex justify-center items-center m-1 text-sm font-medium py-0.5 px-1 rounded-lg text-white bg-green">
                                                {
                                                    selectedItems.length > 2 ? `+${selectedItems.length - 2}` : null
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
                        { dropdown  ? <Dropdown list={items} addItem={addTag}></Dropdown> : null }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Multiselect;