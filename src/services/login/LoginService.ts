// services/loginService.ts

export async function login({ email, password }: { email: string; password: string }) {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // Could be 401 Unauthorized or other errors
    throw new Error("Invalid credentials");
  }

  const data = await response.json();
  return data; // { user: { userType: "ACCOUNT_USER", ... } }
}
