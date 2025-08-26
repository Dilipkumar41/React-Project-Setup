import React, { Component } from "react";
import { loginApi } from "../api/mockApi";
import { setSession} from "../utils/session";
import { generateCSRF, validateCSRF, sanitize } from "../utils/security";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      info: ""
    };
    this.csrfToken = null;
  }

  componentDidMount() {
    // Initialize form state + CSRF token
    this.csrfToken = generateCSRF();
    this.setState({ info: "Please login. CSRF token generated." });
  }

  componentDidUpdate(prevProps) {
    // Monitor auth status change
    if (prevProps.isAuthenticated !== this.props.isAuthenticated && this.props.isAuthenticated) {
      // Successful login observed
      // Could log analytics here; keeping console.log for assignment visibility
      console.log("Login successful, user is authenticated.");
    }
  }

  componentWillUnmount() {
    // Assignment request: cleanup on unmount
    // If we navigated here after a logout, session is already cleared by parent.
    // We ensure no sensitive form data lingers.
    this.setState({ username: "", password: "", error: "", info: "" });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    if (!username || !password) {
      this.setState({ error: "Username and password cannot be empty." });
      return;
    }
    if (!validateCSRF(this.csrfToken)) {
      this.setState({ error: "Invalid CSRF token." });
      return;
    }

    try {
      const user = await loginApi(sanitize(username), sanitize(password));
      setSession(user);
      this.props.onLogin(user); // parent controls navigation
    } catch (err) {
      this.setState({ error: String(err) });
    }
  };

  render() {
    const { error, info } = this.state;

    return (
      <div className="container">
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="e.g., admin or alice"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <div style={{ marginTop: 12 }}>
              <button className="primary" type="submit">Sign In</button>
            </div>
          </form>
          {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
          {info && <small className="muted">{info}</small>}
          <hr />
          <small className="muted">
            Tip: use username <b>admin</b> to see the admin dashboard route.
          </small>
          <div style={{ marginTop: 8 }}>
            <Link to="/dashboard">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
