import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login")
    }
    
    async function fetchGames() {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/v1/games/getall", {
        token: token
      });

      setGames(response.data);
      setLoading(false);
    }

    fetchGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  console.log(games);

  return (
    <div>
      <div>
        <h1>Home</h1>
        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>Logout</button>
      </div>
      <div>
        {
          games.map((game) => (
            <div key={game.id}>{game.title}</div>
          ))
        }
      </div>
    </div>
  )
}
