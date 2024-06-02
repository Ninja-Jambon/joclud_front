import { useEffect, useState } from 'react';
import axios from 'axios';

import './HelpButton.css';

export default function HelpButton({ gameid, helpingprop, token }) {
    const [helping, setHelping] = useState(helpingprop);

    function addHelper() {
        axios.post("http://leizour.fr:3000/api/v1/games/addHelper", { token, gameid })
            .then(() => setHelping(true))
            .catch((error) => console.error("Error adding helper"));
    }

    function removeHelper() {
        axios.post("http://leizour.fr:3000/api/v1/games/removeHelper", { token, gameid })
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

    useEffect(() => {
        if (helping) {
            document.getElementById(`helpbutton-${gameid}`).classList.add("helpButton-enabled");
            document.getElementById(`helpbutton-${gameid}`).classList.remove("helpButton-disabled");
        } else {
            document.getElementById(`helpbutton-${gameid}`).classList.remove("helpButton-enabled");
            document.getElementById(`helpbutton-${gameid}`).classList.add("helpButton-disabled");
        }
    }, [helping]);

    return (
        <button className="helpButton" id={`helpbutton-${gameid}`} onClick={handleClick}>Set helper</button>
    )
}