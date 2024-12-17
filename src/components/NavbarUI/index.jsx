import { Link } from "react-router";
import supabase from "../../supabase/client";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import useProfile from "../../hooks/useProfile";

const style = {
  color: "#0172AD",
  fontSize: "1.5rem",
  textDecoration: "none",
};

export default function NavbarUI() {
  // ho bisogno della sessione per capire quale bottone mostrare...
  // sessione che voglio prendere dal context
  const session = useContext(SessionContext);
  const { username } = useProfile();
  console.log(session);
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    }
  };

  return (
    <nav className="container">
      <ul>
        <li>
          <Link to={`/`} style={style}>
            Rehacktor
          </Link>
        </li>
      </ul>
      {session ? (
        <ul>
          <li>
            <details className="dropdown">
              <summary>{username}</summary>
              <ul dir="rtl">
                <li>
                  <Link to={'/profile'} href="#">Profile</Link>
                </li>
                <li>
                  <Link to={'/account'} href="#">Account</Link>
                </li>
                <li>
                  <a href="#" onClick={signOut}>Logout</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      ) : (
        <ul>
          <li style={{ marginRight: "10px" }}>
            <Link to={`/signin`}>
              <button className="primary">Accedi</button>
            </Link>
          </li>
          <li>
            <Link to={`/signup`}>
              <button className="secondary">Registrati</button>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
