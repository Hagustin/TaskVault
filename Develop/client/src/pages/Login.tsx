import { useState, FormEvent, ChangeEvent } from "react";
import logo from "../assets/task-vault-high-resolution-logo-transparent.png";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import '../styles/Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-title">
          <a href="/">Task Vault</a>
        </div>
        <ul>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <img src={logo} alt="Task Vault Logo" className="logo" />
          <h1>Login</h1>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={loginData.username || ""}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
          />
          <button type="submit">Submit Form</button>
        </form>
      </div>
    </>
  );
};

export default Login;
