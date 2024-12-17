import { useEffect, useState, useContext } from "react";
import useProfile from "../hooks/useProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import supabase from '../supabase/client';
import { Toaster, toast } from "sonner";
import SessionContext from '../context/SessionContext';

export default function AppProfile() {
  const [fav, setFav] = useState([]);
  const session = useContext(SessionContext);
  const { loading, first_name, last_name, username, avatar_url } = useProfile();

  useEffect(() => {
    async function readFav() {
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", session.user.id);
      if (error) {
        toast.error("Error reading from DB...");
      } else {
        setFav(favourites);
      }
    }
    readFav();
    console.log(fav);
  }, []);

  if (loading) {
    return <progress></progress>
  }

  return (
    <div className="container">
      <article>
        <header>
          <h1>Benvenuto {first_name}</h1>
        </header>
        <div className="user_card">
          <section className="dati_user">
            <img style={{
              width: '300px',
              height: '300px'
            }} src={avatar_url && getAvatarUrl(avatar_url)} alt={'image profile'} />
            <p>{username}</p>
            <p>{first_name}</p>
            <p>{last_name}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A rem
              cumque aliquid alias doloremque, perferendis aperiam impedit modi
              dignissimos dolore laudantium culpa ipsum ipsam dolores soluta
              itaque laboriosam voluptates recusandae!
            </p>
          </section>
          <section className="info_user">
            <details>
              <summary role="button" className="secondary">
                Giochi favoriti
              </summary>
              <Toaster richColors />
              {fav.length ? fav.map(game => (
                <li key={game.game_id}>{game.game_name}</li>
              )) : <p>Non ci sono favoriti al momento</p>}
            </details>
            <details>
              <summary role="button" className="contrast">
                Review Fatte
              </summary>
              <p>...</p>
            </details>
          </section>
        </div>
      </article>
    </div>
  );
}
