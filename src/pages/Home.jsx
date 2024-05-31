import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    async function fetchGames() {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/v1/games/getall", { token });
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [navigate]);

  const handleSearchChange = (event) => {
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
          <div key={game.id}>
            <img src={`https://www.myludo.fr/img/jeux/1/300/${getCode(Math.floor(game.id / 1000))}/${game.id}.png`} />
            {game.title}
          </div>
        ))
      )}
    </div>
  );
}
