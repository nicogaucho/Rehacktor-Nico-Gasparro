import { useLoaderData, Link } from 'react-router';
import style from "./styles.module.css";

export default function SideBarFilters() {
  // Pre carica dei dati usando react-router...
  const { genres, platforms } = useLoaderData();

  return (
    <aside className="sidebar">
      <h5>Generi</h5>
      <details className="dropdown">
        <summary>Vedi Generi</summary>
        <ul className={style.visible_filter}>
          {genres.map((genre) => (
            <li key={genre.id}>
              <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      </details>
      <h5>Console</h5>
      <details className="dropdown">
        <summary>Vedi console</summary>
        <ul className={style.visible_filter}>
          {platforms.map((platform) => (
            <li key={platform.id}>
              <Link to={`/plaforms/${platform.slug}`}>{platform.name}</Link>
            </li>
          ))}
        </ul>
      </details>
    </aside>
  );
}
