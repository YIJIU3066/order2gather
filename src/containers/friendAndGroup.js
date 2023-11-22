import Navbar from "../components/navbar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FriendAndGroup = () => {
    return (
        <>
            <Navbar />
            <div className="flex p-10 items-center justify-center">
                <h2 className="text-blue font-bold text-4xl">My Friends & My Groups</h2>
            </div>
            <div className="flex p-10 items-center justify-around flex-wrap gap-6">
                <div className="flex items-center flex-col justify-center gap-2">
                    <Link to="/friendList">
                        <button className="bg-blue rounded-3xl w-80 h-24">
                            <FontAwesomeIcon icon={faHandshake} style={{color: "#ffffff"}} size="4x" />
                        </button>
                    </Link>
                    <p className="text-blue text-xl font-bold">Friend</p>
                </div>
                <div className="flex items-center flex-col justify-center gap-2">
                    <button className="bg-brown rounded-3xl w-80 h-24">
                        <FontAwesomeIcon icon={faUserGroup} style={{color: "#ffffff"}} size="4x" />
                    </button>
                    <p className="text-brown text-xl font-bold">Group</p>
                </div>
            </div>
        </>
    );
};
export default FriendAndGroup;
