import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import GameImage from "../components/GameUI/components/GameImage";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import RealtimeChat from "../components/RealtimeChatUI/index";

export default function AppGame() {
  const [fav, setFav] = useState([]);
  const session = useContext(SessionContext);
  const game = useLoaderData();

  async function readFav() {
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("game_id", game.id)
      .eq("profile_id", session.user.id);
    if (error) {
      toast.error("Error reading from DB...");
    } else {
      setFav(favourites);
    }
  }

  async function addToFavorites(game) {
    const { data, error } = await supabase
      .from("favourites")
      .insert([
        { profile_id: session.user.id, game_id: game.id, game_name: game.name },
      ])
      .select();
    if (error) {
      toast.error("Insert Failed!");
    } else {
      toast.success("Added successfully");
      console.log(data);
      readFav();
    }
  }

  async function removeFromFav(game) {
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("game_id", game.id)
      .eq("profile_id", session.user.id);
    if (error) {
      toast.error("Removing failed!");
    } else {
      toast.success("Removed successfully");
      readFav();
    }
  }

  async function handleMessageSubmit(event) {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    // Sanitize Input...
    if (typeof message === "string" && message.trim().length !== 0) {
      // allora inserisci nel DB
      // se vuoi fare sanitazing input piu serio... ti consiglio una libreria come dompurify o altre...
      const { data, error } = await supabase
        .from("Messages")
        .insert([
          {
            profile_id: session.user.id,
            profile_username: session.user.user_metadata.username,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        toast.error("Message failed!");
      } else {
        toast.success("Message Sent!");
        inputMessage.reset();
        console.log(data, "Risposta messaggio");
      }
    }
  }

  useEffect(() => {
    if (session) readFav();
  }, []);

  return (
    <div className="container game_detail_wrapper">
      {/* componente contenuti */}
      <div className="game_info">
        <h1>{game.name}</h1>
        {session && (
          <div>
            {fav.length == 0 ? (
              <button type="button" onClick={() => addToFavorites(game)}>
                Aggiungi tra preferiti
              </button>
            ) : (
              <button
                type="button"
                className="secondary"
                onClick={() => removeFromFav(game)}
              >
                Rimuovi dai preferiti
              </button>
            )}
            <Toaster richColors />
          </div>
        )}
        <p>Info sul ranking</p>
        <p>{game.rating}</p>
        {session && <button className="contrast">Vai alla review</button>}
        <h3>About</h3>
        <small>{game.description_raw}</small>
      </div>
      {/* componente Media */}
      <div className="game_media">
        {/* Immagine */}
        <GameImage image={game.background_image} />
        {/* <GameImage image={game.background_image_additional} /> */}
        {session && (
          <div className="chat_game_container">
            <div className="messages">
              Chat con Gamers
              {/* CREATE REALTIMECHATMESSAGES   COMPONENT */}
              <RealtimeChat game={game} />
            </div>
            <div className="message_form_wrapper">
              <p
                style={{
                  margin: "10px 0",
                  padding: "0",
                }}
              >
                Live chat con altri gamers
              </p>
              <form onSubmit={handleMessageSubmit}>
                <fieldset role="group">
                  <input type="text" name="message" placeholder="Chat..." />
                  <input type="submit" value="Invia" />
                </fieldset>
              </form>
              <Toaster richColors />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
