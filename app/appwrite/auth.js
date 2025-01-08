import { Client, Account, ID } from 'appwrite';
import conf from '../conf/conf.js';

export class Auth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)  // Correct Appwrite endpoint
      .setProject(conf.appwriteProjectId);  // Appwrite Project ID
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userId = ID.unique();  // This is only for user creation, not login

      if (!/^[a-zA-Z0-9._-]{1,36}$/.test(userId)) {
        throw new Error('Generated userId is invalid.');
      }

      // Create the user account (without manually passing userId in the session creation)
      const userAccount = await this.account.create(userId, email, password, name);
      if (userAccount) {
        return this.login({ email, password });  // Automatically log the user in after account creation
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  // Corrected login method: Only email and password are passed to createSession
  async login({ email, password }) {
    try {
      // Correct login flow using email and password
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Method to get the current logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
  }

  // Logout method to clear sessions
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }


  async UpdatePrefs(prefs) {
    // Validate prefs object
    if (typeof prefs !== "object" || prefs === null) {
      throw new Error("Preferences must be a non-null object.");
    }

    try {
      // Update preferences
      await this.account.updatePrefs(prefs);

      // Optionally, fetch and return the updated user object
      return await this.getCurrentUser();
    } catch (error) {
      console.error("Appwrite service :: UpdatePrefs :: error", error);
      throw error; // Propagate the error for the caller to handle
    }
  }

}

const auth = new Auth();

export default auth;
