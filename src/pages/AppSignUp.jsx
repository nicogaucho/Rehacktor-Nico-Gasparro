import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { Toaster, toast } from 'sonner';

function AppSignUp() {
  const navigate = useNavigate();

  const handleSubmission = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password, username, first_name, last_name } = Object.fromEntries(new FormData(formRegister));
        // Insert in supabase Users Table
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            first_name,
            last_name,
          },
        },
      })
      if (error) {
        toast.error('Signed up failed!')
      } else {
        toast.success('Signed up success!');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        formRegister.reset();
        navigate('/');
      }
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div className="container">
      <div className="register_container">
        <div id="Register" className="register_element">
          <h2>Registra come nuovo account</h2>
          <form onSubmit={handleSubmission}>
            <label htmlFor="username">Username</label>
            <input 
              type="text"
              id="username" 
              name="username" 
              placeholder="test username"
            />
            <label htmlFor="first_name">First Name</label>
            <input 
              type="text"
              id="first_name" 
              name="first_name" 
              placeholder="test first_name"
            />
            <label htmlFor="last_name">Last Name</label>
            <input 
              type="text"
              id="last_name" 
              name="last_name" 
              placeholder="test last_name"
            />
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="test@gmail.com"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="supersecret"
              required
            />
            {/* <label htmlFor="confirm_password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm_password" 
              name="confirm_password" 
              placeholder="supersecret"
            /> */}
            <button type="submit">
              Fai Sign Up
              <CiLogin
                style={{
                  marginLeft: "10px",
                }}
              />
            </button>
            <Toaster richColors />
          </form>
          <p>
            Ho gia un account, vai a <Link to="/signin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppSignUp;
