import Helpers from "./Helpers"

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
                <h1 className='game-title'>{game.title}</h1>
                <div className='game-bottom'>
                    <Helpers gameid={game.id} user={user} token={token} />
                </div>
              </div>
        </div>
    )
}