export async function signin(email, password) {
    const res = await fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) {
      throw new Error("Invalid email or password");
    }
  
    return res.json(); // { token: "..." }
  }
  
  // services/authApi.js
export async function signup(email, password) {
    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Signup failed.");
      }
  
      return await res.json();
    } catch (err) {
      throw new Error(err.message || "Server error");
    }
  }
  