import Helpers from "./Helpers"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Game({game, token, user}) {
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
        <div className='game'>
            <img src={`https://www.myludo.fr/img/jeux/1/300/${getCode(Math.floor(game.id / 1000))}/${game.id}.png`} className='game-image'/>
            <div className='game-right'>
                <h1 className='game-title'>{game.title}{game.subtitle ? `, ${game.subtitle}` : null}</h1>
                <div className="tags">
                    {game.type == "extension" ? <div className="tag extension"><FontAwesomeIcon icon="fa-solid fa-plus" />  Extension</div> : <div className="tag basegame"><FontAwesomeIcon icon="fa-solid fa-puzzle-piece" /> Jeu de base</div>}
                    <div className="tag players"><FontAwesomeIcon icon="fa-solid fa-user-group" /> {game.players}</div>
                    <div className="tag duration"><FontAwesomeIcon icon="fa-regular fa-clock" /> {game.duration}</div>
                    <div className="tag ages"><FontAwesomeIcon icon="fa-solid fa-child" /> {game.ages}</div>
                </div>
                <div className='game-bottom'>
                    <Helpers gameid={game.id} user={user} token={token} />
                </div>
              </div>
        </div>
    )
}