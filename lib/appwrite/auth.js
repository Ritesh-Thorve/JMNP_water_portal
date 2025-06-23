// Import Appwrite configuration and necessary classes
import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

// AuthService class handles user authentication (signup, login, logout, etc.)
export class AuthService {
  client = new Client();
  account;

  constructor() {
    // Initialize the Appwrite client with endpoint & project ID
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    // Create an Account instance tied to the client
    this.account = new Account(this.client);
  }

  //Create a new account and auto-login
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Add delay to avoid 429 from Appwrite Cloud
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return await this.login({ email, password });
    } catch (error) {
      if (error.code === 409) {
        throw new Error("This email is already registered.");
      }
      if (error.code === 429) {
        throw new Error("Too many requests. Please wait and try again.");
      }
      throw error;
    }
  }

  //Login user using email/password
  async login({ email, password }) {
    try {
      // Appwrite SDK v8+ uses createEmailSession
      return await this.account.createEmailSession(email, password);

      // For Appwrite SDK v7 or older, use:
      // return await this.account.createSession(email, password);
    } catch (error) {
      throw new Error("Invalid credentials or user not found.");
    }
  }

  //Get currently logged-in user info
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite getCurrentUser error:", error);
      return null;
    }
  }

  //Logout user from all sessions
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite logout error:", error);
    }
  }
}

// Export a singleton instance to use globally
const authService = new AuthService();
export default authService;
