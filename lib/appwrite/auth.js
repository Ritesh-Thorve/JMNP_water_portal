// lib/appwrite/auth.js
import { Client, Account, ID } from "appwrite"
import conf from "../config/conf"

export class AuthService {
  client = new Client()
  account

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(ID.unique(), email, password, name)
      await new Promise(resolve => setTimeout(resolve, 5000)) // Rate limit delay
      return await this.login({ email, password })
    } catch (error) {
      if (error.code === 409) throw new Error("This email is already registered.")
      if (error.code === 429) throw new Error("Too many requests. Please wait and try again.")
      throw error
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.error("Login error", error)
      throw error
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      console.error("getCurrentUser error", error)
      return null
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.error("Logout error", error)
    }
  }
}

const authService = new AuthService()
export default authService
