import { useNavigate } from "react-router";
import { FaDiscord } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import supabase from '../supabase/client';
import { Toaster, toast } from 'sonner';

function AppSignIn() {
  const navigate = useNavigate();
  const handleSignIn = async (event) => {
    event.preventDefault();
    const formLogin = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formLogin));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        toast.error('Signed up failed!')
      } else {
        toast.success('Signed up success!');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        formLogin.reset();
        navigate('/');
      }
    } catch (error) {
      alert(error)
    }
  };


  return (
    <div className="container">
      <div className="login_container">
        <div id="LoginEmail" className="login_element">
          <h1>Log In</h1>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">
              Email address
              <input
                type="email"
                id="email"
                name="email"
                placeholder="test@gmail.com"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="supersecret"
              />
            </label>
            <button type="submit">
              Fai sign In
              <CiLogin className="login_icons" />
            </button>
            <Toaster richColors />
          </form>
        </div>
        <div id="LoginOAuth" className="login_element">
          <h1>Puoi fare login con Social auth</h1>
          <button
            type="button"
            className="contrast"
          >
            Login con Discord
            <FaDiscord className="login_icons" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppSignIn;