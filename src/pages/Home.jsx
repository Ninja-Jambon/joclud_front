import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

import './Home.css';

import HelpButton from '../assets/HelpButton';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userloading, setUserLoading] = useState(true);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    if (!tokenLocal) {
      navigate("/login");
      return;
    }

    setToken(tokenLocal);
    setUser(JSON.parse(atob(tokenLocal.split(".")[1])).user);
    setUserLoading(false);

    async function fetchGames() {
      setLoading(true);
      try {
        const response = await axios.post("http://leizour.fr:3000/api/v1/games/getall", { token: tokenLocal });
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  function handleSearchChange(event) {
    setName(event.target.value);
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

  const currentGames = filteredGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function getCode(id) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const base = alphabet.length;
    let firstLetterIndex = Math.floor(id / base);
    let secondLetterIndex = id % base;

    let firstLetter = alphabet[firstLetterIndex];
    let secondLetter = alphabet[secondLetterIndex];

    return firstLetter + secondLetter;
  }

  return (
    <div>
      <h1 className='page-title'>Base de données des jeux Joclud</h1>
      <div className='home'>
        <h2 className='welcome'>Bienvenue, {userloading ? "..." : user.name} !</h2>
        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }} className='logout-button'>
          Me déconnecter
        </button>
      </div>
      <div className='search'>
        <input type="text" value={name} onChange={handleSearchChange} className='search-input' placeholder='Chercher un jeu'/>
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
      <div className='games'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          currentGames.map((game) => (
            <div className='game'>
              <img src={`https://www.myludo.fr/img/jeux/1/300/${getCode(Math.floor(game.id / 1000))}/${game.id}.png`} className='game-image'/>
              <div className='game-right'>
                <h1 className='game-title'>{game.title}</h1>
                <div className='game-bottom'>
                  <div className='helpers'>
                    {JSON.parse(game.helpers).length === 0 ? (
                      <p className='no-helper'>Personne</p>
                    ) :
                    (JSON.parse(game.helpers).map((helper) => (
                      helper === user.username ? () => { } : (
                        <p className='helper'>{helper}</p>
                      ))))}
                  </div>
                  <HelpButton gameid={game.id} helpingprop={JSON.parse(game.helpers).includes(user.username)} token={token} />
                </div>
              </div>
            </div>
          ))
        )}
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
    </div>
  );
}
