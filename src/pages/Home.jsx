import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

import './Home.css';

import Game from '../assets/Game';

export default function Home() {
	const navigate = useNavigate();
	const [user, setUser] = useState();
	const [token, setToken] = useState();
	const [games, setGames] = useState([]);
	const [userloading, setUserLoading] = useState(true);
	const [gameLoading, setGameLoading] = useState(true);
	const [name, setName] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const tokenLocal = localStorage.getItem("token");

		function checkToken() {
			if (!tokenLocal) {
				navigate("/login");
				return;
			}
	
			setToken(tokenLocal);
			setUser(JSON.parse(atob(tokenLocal.split(".")[1])).user);
			setUserLoading(false);
		}

		async function fetchGames() {
			try {
				const response = await axios.post("https://leizour.fr/api/v1/games/getall", { token: tokenLocal });
				setGames(response.data);
			} catch (error) {
				console.error("Error fetching games:", error);
			} finally {
				setGameLoading(false);
			}
		}

		checkToken();
		fetchGames();
	}, []);

	function handleSearchChange(event) {
		setName(event.target.value);
		setCurrentPage(1);
	};

	const filteredGames = games.filter((game) =>
		game.title.toLowerCase().includes(name.toLowerCase())
	);

	const itemsPerPage = 10;
	const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

	function handlePageChange(newPage) {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
			window.scrollTo(0, 0);
		}
	}

	function resetSearch() {
		setName("");
	}

	const currentGames = filteredGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	if (userloading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<h1 className='page-title'>Base de données des jeux Joclud</h1>
			<div className='home'>
				<h2 className='welcome'>Bienvenue, {user.name} !</h2>
				<button onClick={() => {
					localStorage.removeItem("token");
					navigate("/login");
				}} className='logout-button'>
					Me déconnecter
				</button>
			</div>
			<div className='search'>
				<input type="text" value={name} onChange={handleSearchChange} className='search-input' placeholder='Chercher un jeu' />
				<button className='button' onClick={resetSearch}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
			</div>
			<div className="pagination">
				<button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-angles-left" />
				</button>
				<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
				</button>
				<span className='pagination-text'>Page {currentPage} sur {totalPages}</span>
				<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-chevron-right" />
				</button>
				<button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-angles-right" />
				</button>
			</div>
			{gameLoading ? <p>Loading...</p> :
				<div className='games'>
					{currentGames.map((game) => {
						return <Game key={game.id} game={game} token={token} user={user} />
					})}
				</div>
			}
			<div className="pagination">
				<button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-angles-left" />
				</button>
				<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
				</button>
				<span className='pagination-text'>Page {currentPage} sur {totalPages}</span>
				<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-chevron-right" />
				</button>
				<button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="pagination-button">
					<FontAwesomeIcon icon="fa-solid fa-angles-right" />
				</button>
			</div>
		</div>
	);
}
