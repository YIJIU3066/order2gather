import React from 'react';


const Dropdown = ({list, addItem, selected}) => {
    return (
        <div id="dropdown" className="w-full absolute shadow top-100 bg-white z-40 lef-0 rounded max-h-select overflow-y-auto ">
            <div className="flex flex-col w-full h-40 overflow-y-scroll">
                { list.map((item, key) => {
                    return <div key={key} 
                    className=" w-full border-gray-100 rounded-t border-b">
                        <div className="flex w-full justfy-center items-center p-2 pl-2 border-transparent border-l-2 relative" >
                            <input type="checkbox" checked={selected.includes(item)} onClick={() => addItem(item)} className="cursor-pointer accent-blue border-blue"/>
                            <div className="mx-2 leading-6">
                                { item.name }
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Dropdown;