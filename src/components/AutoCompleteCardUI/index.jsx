import { Link } from "react-router";
import style from "./styles.module.css";

export default function AutoCompleteCardUI({ game }) {
  const { name, background_image } = game;
  return (
    <Link to={`/game/${game.id}`} className={style.linkReset}>
      <div className={style.cardSuggestions}>
        <img
          className={style.imgAvatarSuggestions}
          src={background_image}
          alt={"image suggestions"}
        />
        <small>{name}</small>
      </div>
    </Link>
  );
}
