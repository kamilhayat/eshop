import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfiq";
import styled from "styled-components";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        toast.success("Login successful! Redirecting to home...");
        navigate("/");
      } else {
        toast.error("Please verify your email before logging in.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      if (user) {
        toast.success("Login successful with Google! Redirecting to home...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to sign in with Google.");
    }
  };
  

  return (
    <Wrapper>
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button className="google-btn" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
        <div className="login-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </Wrapper>
  );
};




const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .form-container {
    background: #fff;
    padding: 4rem;
    border-radius: 12px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;

    h2 {
      margin-bottom: 1.8rem;
      font-size: 2.2rem;
      color: #333;
      font-weight: bold;
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      input {
        padding: 0.9rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s;

        &:focus {
          border-color: #2575fc;
          outline: none;
          box-shadow: 0px 0px 5px rgba(37, 117, 252, 0.5);
        }
      }

      button {
        padding: 0.9rem;
        background-color: #2575fc;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        transition: background-color 0.3s, transform 0.2s;

        &:hover {
          background-color: #1a5ec3;
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }


      .google-btn {
        padding: 0.9rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        margin:1.2rem 0;
        font-weight: bold;
        width: 100%;
        margin-bottom: 1rem;
        transition: background-color 0.3s, transform 0.2s;

        &:hover {
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .google-btn {
        background-color: #db4437;
        color: #fff;

        &:hover {
          background-color: #c33d2f;
        }
      }

      .facebook-btn {
        background-color: #4267b2;
        color: #fff;

        &:hover {
          background-color: #365899;
        }
      }
    

    .signup-link {
      margin-top: 1rem;
      font-size: 1rem;
      color: #666;

      a {
        color: #2575fc;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 2rem;
    }
  }
`;


export default Login;
