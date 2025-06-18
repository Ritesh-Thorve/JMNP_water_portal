// Import config file and required classes from Appwrite SDK
import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Define a class to encapsulate all Appwrite-related services
export class Service {
    // Initialize Appwrite client, database, and storage properties
    client = new Client();
    databases;
    bucket;

    // Constructor runs when an instance of the class is created
    constructor() {
        // Setup the Appwrite client using endpoint and project ID from config
        this.client
            .setEndpoint(conf.appwriteUrl)  
            .setProject(conf.appwriteProjectId); 
        // Initialize the Databases and Storage modules
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // ------------------ DATABASE SERVICES ------------------

    // Create a new blog post document in Appwrite database
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,     
                conf.appwriteCollectionId,     
                slug,                    
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // Update an existing blog post document by slug
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Delete a blog post document by its slug
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Get a single blog post by its slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Get all posts that match the query (default: only active posts)
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // ------------------ FILE STORAGE SERVICES ------------------

    // Upload a file (e.g., image) to Appwrite Storage bucket
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,   // Bucket ID from config
                ID.unique(),             // Unique ID for the file
                file                     // File to upload (input[type=file].files[0])
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // Delete a file from storage using its ID
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // Get a URL preview for a file (can be used in <img src="...">)
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

// Create a single instance (singleton) of Service and export it
const service = new Service();
export default service;
