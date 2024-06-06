import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

export default function UserVerfication({token}) {
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            const response = await axios.post("https://leizour.fr/api/v1/admin/getUnVerifiedUsers", { token })
                .catch((error) => {console.error("Error fetching users:", error);})
            setUsers(response.data);
            setUsersLoading(false);
        }

        fetchUsers();
    }, []);

    function verifyUser(username) {
        axios.post("https://leizour.fr/api/v1/admin/verifyUser", { token, username })
            .then(() => {
                setUsers(users.filter((user) => user.username !== username));
            })
            .catch((error) => {console.error("Error verifying user:", error);})
    }

    if (usersLoading) {
        return <div>Loading...</div>
    }

    else if (users.length === 0) {
        return <div className='no-users'>Aucun utilisateur à vérifier</div>
    }

    else {
        return (
            <div className='users'>
                {users.map((user) => {
                    return (
                        <div className='user' key={user.id}>
                            <p>{user.username}</p>
                            <p>{user.name}</p>
                            <p>{user.lastname}</p>
                            <p>{user.id}</p>
                            <button className='verify-button' onClick={() => {verifyUser(user.username)}}>Vérifier</button>
                        </div>
                    )
                })}
            </div>
        )
    }

}