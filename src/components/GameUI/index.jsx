import { Link } from 'react-router';
import style from './styles.module.css';
import GameImage from './components/GameImage';

function GameUI({ game }) {
  const { background_image: image } = game;
  return (
    <Link to={`/game/${game.id}`} className={style.card_game}>
      <article className={`${style.expose} ${style.layout_card}`}>
        <GameImage image={image} />
        <h4>{game.name}</h4>
        <p>{game.genres.map((genre) => genre.name).join(', ')}</p>
      </article>
    </Link>
  );
}

export default GameUI;  