import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Define a class to encapsulate all Appwrite-related services
export class Service {
  // Initialize Appwrite client, database, and storage properties
  client = new Client();
  databases;
  bucket;

  // Constructor runs when an instance of the class is created
  constructor() {
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

  // Upload a file (image) to Appwrite Storage bucket
  async uploadFile(file) {
    try {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
      }

      // Validate file type (images only)
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG images are allowed");
      }

      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      throw error; // Re-throw for handling in UI
    }
  }

  // Delete a file from storage using its ID
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  // Get a URL preview for a file (can be used in <img src="...">)
    getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }


  // Create a new query submission
    async submitQuery({ full_name, phone_no, ward_no, issue_type, message, image }) {
      try {
        let imageFileId = null;

        // Step 1: Upload the image if provided
        if (image) {
          const uploaded = await this.uploadFile(image);
          imageFileId = uploaded.$id;
        }

        // Step 2: Submit the document with image file ID
        return await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionIdForQueries, // <-- Make sure this is your actual collection ID
          ID.unique(),
          {
            full_name,
            phone_no,
            ward_no,
            issue_type,
            message,
            image: imageFileId, // store only file ID
            status: "pending", // default
            submitted_at: new Date().toISOString()
          }
        );
      } catch (error) {
        console.error("Appwrite :: submitQuery error:", error);
        throw error;
      }
    }


  async getAllQueries() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForQueries
      );
    } catch (error) {
      console.error("Appwrite service :: getAllQueries :: error", error);
      return { documents: [] };
    }
  }

  async updateQueryStatus(queryId, newStatus) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForQueries,
        queryId,
        { status: newStatus }
      );
    } catch (err) {
      console.error("Appwrite service :: updateQueryStatus :: error", err);
      return null;
    }
  }

  async deleteQuery(queryId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForQueries,
        queryId
      );
      return true;
    } catch (err) {
      console.error("Appwrite service :: deleteQuery :: error", err);
      return false;
    }
  }
}

const service = new Service();
export default service;
