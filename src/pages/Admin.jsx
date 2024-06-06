import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

import UserVerfication from '../assets/UserVerfication';

export default function Admin() {
	const navigate = useNavigate();
	const [user, setUser] = useState();
	const [token, setToken] = useState();
	const [userloading, setUserLoading] = useState(true);
    const [section , setSection] = useState(1);

    useEffect(() => {
		const tokenLocal = localStorage.getItem("token");

		function checkToken() {
			if (!tokenLocal) {
				navigate("/login");
				return;
			}

			if (JSON.parse(atob(tokenLocal.split(".")[1])).expiration < Date.now()) {
				localStorage.removeItem("token");
				navigate("/login");
				return;
			}
	
			setToken(tokenLocal);
			setUser(JSON.parse(atob(tokenLocal.split(".")[1])).user);
			setUserLoading(false);
		}

		checkToken();
	}, []);

    if (userloading) return <div>Loading...</div>;

    return (
        <div>
			<h1 className='page-title'>Base de données des jeux Joclud</h1>
			<div className='home'>
				<h2 className='welcome'>Bienvenue, {user.name} !</h2>
				<button onClick={() => navigate("/")} className='button admin-button'>Home</button>
				<button onClick={() => {
					localStorage.removeItem("token");
					navigate("/login");
				}} className='logout-button'>
					Me déconnecter
				</button>
			</div>
            <div className='navigation'>
                <button className='button' onClick={() => {setSection(1)}}>Vérification d'utilisateurs</button>
                <button className='button' onClick={() => {setSection(2)}}>Importation de jeux</button>
            </div>
            {section === 1 ? <UserVerfication token={token} /> : null}
		</div>
    );
}