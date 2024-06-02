import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HelpButton from '../assets/HelpButton';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    if (!tokenLocal) {
      navigate("/login");
      return;
    }

    setToken(tokenLocal);
    setUser(JSON.parse(atob(tokenLocal.split(".")[1])).user);
    
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
      <div>
        <h1>Home</h1>
        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>Logout</button>
      </div>
      Recherche : <input
        type="text"
        value={name}
        onChange={handleSearchChange}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        filteredGames.map((game) => (
          <div className='game'>
            <img src={`https://www.myludo.fr/img/jeux/1/300/${getCode(Math.floor(game.id / 1000))}/${game.id}.png`} />
            <h1 className='game-title'>{game.title}</h1>
            <div className='helpers'>
              {(JSON.parse(game.helpers).map((helper) => (
                helper === user.id ? () => {} : (
                  <div className='helper'>
                    <h2 className='helper-title'>{helper}</h2>
                  </div>
              ))))}
            </div>
            <HelpButton gameid={game.id} helpingprop={JSON.parse(game.helpers).includes(user.id)} token={token} />
          </div>
        ))
      )}
    </div>
  );
}
