import React, { useState } from 'react'
import Multiselect from './Multiselect'
import { Link, useNavigate } from "react-router-dom";

export default function SuccessMessage({menuid, setMenuOpen}) {
    const navigate = useNavigate();
    const handleClose = () => {
        setMenuOpen(false);
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="md:w-1/3 sm:w-2/3 border-8 border-blue p-4 rounded shadow flex flex-col items-center bg-slate-50 relative">
                <div className="grid grid-cols-3 w-4/5 gap-3 my-4 items-center">
                    <h2 className="text-2xl text-blue font-bold my-2 mr-auto col-span-2"></h2>
                    <button onClick={handleClose} className="text-3xl right-3 top-2 text-blue justify-self-end">X</button>
                    <div></div>
                </div>
                    <div className="md:w-1/3 sm:w-2/3 border-8 border-blue p-4 rounded shadow flex flex-col items-center bg-slate-50 relative">
                <div>Menu id {menuid}</div>
            </div>    
        </div>
    </div>
    )
}
