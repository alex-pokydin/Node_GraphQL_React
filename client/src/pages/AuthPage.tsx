import React, { useState } from "react";
import "./AuthPage.scss";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  // Handle form submission logic here
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    if (!email?.trim() || !password?.trim()) {
      alert("Please fill in all fields");
      return;
    }
    const requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `,
    };
    // Send a POST request to the GraphQL server
    fetch("http://localhost:3100/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Failed to authenticate");
        }
        return response.json();
      })
      .then((data) => {
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }
        const { userId, token, tokenExpiration } = data.data.login;
        console.log("User ID:", userId);
        console.log("Token:", token);
        console.log("Token Expiration:", tokenExpiration);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Authentication failed");
      });
  };

  return (
    <div>
      <h1>Authentication page</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            ref={emailInputRef}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            ref={passwordInputRef}
          />
        </div>
        <div className="form-actions">
          <button type="submit">{isLogin ? "Signin" : "Signup"}</button>
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            Switch to {isLogin ? "Signup" : "Signin"}
          </button>
        </div>
      </form>
    </div>
  );
}
