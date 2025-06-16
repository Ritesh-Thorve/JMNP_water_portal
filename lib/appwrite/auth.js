import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

// AuthService handles all authentication-related operations with Appwrite
export class AuthService {
    client = new Client(); // Initialize Appwrite client
    account;               // Will hold Account instance for auth actions

    constructor() {
        // Configure the Appwrite client with endpoint and project ID from environment variables
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        // Initialize Account instance using the configured client
        this.account = new Account(this.client);
    }

    // Create a new user account and auto-login upon success
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // If account creation is successful, automatically log the user in
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Log in an existing user using email and password
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // Get the currently logged-in user's information
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null; // Fallback if no user found
    }

    // Log the user out from all sessions
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

// Export an instance of AuthService for use throughout the app
const authService = new AuthService();

export default authService;
