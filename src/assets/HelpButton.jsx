import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

export default function HelpButton({ gameid, helpingprop, token }) {
    const [helping, setHelping] = useState(helpingprop);
    console.log("helpingprop:", helpingprop)

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
        console.log("helping:", helping)
        if (helping) {
            removeHelper();
        } else {
            addHelper();
        }
    }

    useEffect(() => {
        setHelping(helpingprop);
    }, [helpingprop]);

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
        <button className="helpButton" id={`helpbutton-${gameid}`} onClick={handleClick}>{helping ? <FontAwesomeIcon icon="fa-solid fa-book-bookmark" /> : <FontAwesomeIcon icon="fa-solid fa-book" />}</button>
    )
}