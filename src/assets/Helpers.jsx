import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

export default function Helpers({ gameid, user, token }) {
    const [helpers, setHelpers] = useState([]);
    const [gameLoading, setGameLoading] = useState(true);
    const [helping, setHelping] = useState();

    useEffect(() => {
        async function fetchGame() {
            const response = await axios.post("https://leizour.fr/api/v1/games/getGame", { token, gameid })
                .catch((error) => console.error("Error getting game"));
            setHelpers(JSON.parse(response.data.helpers));
            setHelping(JSON.parse(response.data.helpers).includes(user.username));
            setGameLoading(false);
        }

        fetchGame();
    }, [gameid, helping]);

    function addHelper() {
        axios.post("https://leizour.fr/api/v1/games/addHelper", { token, gameid })
            .then(() => setHelping(true))
            .catch((error) => console.error("Error adding helper"));
    }

    function removeHelper() {
        axios.post("https://leizour.fr/api/v1/games/removeHelper", { token, gameid })
            .then(() => setHelping(false))
            .catch((error) => console.error("Error removing helper"));
    }

    function handleClick(event) {
        if (helping) {
            removeHelper();
        } else {
            addHelper();
        }
    }

    if (gameLoading) {
        return <p>Loading...</p>
    }

    else if (helpers.length === 0) {
        return (
            <div className='helpers'>
                <p className='no-helper'><FontAwesomeIcon icon="fa-regular fa-face-frown-open" /> Personne</p>
                <button className={`helpButton ${helping ? "helpButton-enabled" : "helpButton-disabled"}`} 
                        id={`helpbutton-${gameid}`} 
                        onClick={handleClick}>
                        {helping ? <FontAwesomeIcon icon="fa-solid fa-book-bookmark" /> : <FontAwesomeIcon icon="fa-solid fa-book" />}
                </button>
            </div>
        )
    }

    else {
        return (
            <div>
                <div className='helpers'>
                    {helpers.map((helper) => {
                        if (helper === user.username) {
                            return <p className='helper' key={helper}><FontAwesomeIcon icon="fa-regular fa-face-smile" /> Vous</p>
                        } else {
                            return <p className='helper' key={helper}><FontAwesomeIcon icon="fa-regular fa-face-smile" /> {helper}</p>
                        }
                    })}
                    <button className={`helpButton ${helping ? "helpButton-enabled" : "helpButton-disabled"}`} 
                        id={`helpbutton-${gameid}`} 
                        onClick={handleClick}>
                        {helping ? <FontAwesomeIcon icon="fa-solid fa-book-bookmark" /> : <FontAwesomeIcon icon="fa-solid fa-book" />}
                    </button>
                </div>
            </div>
        )
    }
}