import React from 'react';


const Dropdown = ({list, addItem}) => {
    return (
        <div id="dropdown" className="w-[48%] absolute shadow top-100 bg-white z-40 lef-0 rounded max-h-select overflow-y-auto ">
            <div className="flex flex-col w-full h-40 overflow-y-scroll">
                { list.map((item, key) => {
                    return <div key={key} 
                    className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue" 
                    onClick={() => addItem(item)}>
                        <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:text-white" >
                            <div className="w-full items-center flex">
                                <div className="mx-2 leading-6">
                                    { item }
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Dropdown;