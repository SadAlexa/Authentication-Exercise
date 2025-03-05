export class AuthApi {
  async login(email: string, password: string): Promise<Response> {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response;
  }

  async register(
    name: string,
    surname: string,
    email: string,
    /* dateOfBirth: Date, */
    /* image: string, */
    password: string
  ): Promise<Response> {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email, /* image, */ password }),
    });
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return response;
  }

  async logout() {
    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return await response.json();
  }
}
