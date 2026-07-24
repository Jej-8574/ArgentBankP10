import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";
import "./SignIn.css";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "../../authSlice";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const url = "http://localhost:3001/api/v1/user/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Statut de réponse : ${response.status}`);
      }
      const data = await response.json();
      const token = data.body.token;

      dispatch(loginSuccess(token));

      const profileResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!profileResponse.ok) {
        throw new Error(`Statut de réponse : ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();
      dispatch(setUser(profileData.body));
      navigate("/user");
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;
