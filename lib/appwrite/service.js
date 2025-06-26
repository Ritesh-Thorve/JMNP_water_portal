import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ------------------ NEWS MANAGEMENT ------------------

  async createPost({ title, content, ward_no, featuredImage, status }) {
    try {
      const post = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForUpdates,
        ID.unique(),
        {
          title,
          content,
          ward_no,
          featuredImage,  
          status,
          date: new Date().toISOString(),
          type: "update"
        }
      );
      return post;
    } catch (error) {
      console.error("Appwrite :: createPost error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, ward_no, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForUpdates,
        slug,
        {
          title,
          content,
          status,
          ward_no,
          featuredImage: featuredImage ? featuredImage.$id : null,
          date: new Date().toISOString(),
          type: "update",
        }
      );
    } catch (error) {
      console.log("Appwrite :: updatePost error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForUpdates,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForUpdates,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: getPost error", error);
      return null;
    }
  }

  async getAllNews() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForUpdates
      );
    } catch (error) {
      console.log("Appwrite :: getAllNews error", error);
      return { documents: [] };
    }
  }

  // ------------------ FILE STORAGE ------------------

  async uploadFile(file) {
    try {
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB");
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG images are allowed");
      }

      const uploaded = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploaded;
    } catch (error) {
      console.error("Appwrite :: uploadFile error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
  }

  // ------------------ QUERY MANAGEMENT------------------

  async submitQuery({
    full_name,
    phone_no,
    ward_no,
    issue_type,
    message,
    image,
  }) {
    try {
      let imageFileId = null;

      if (image) {
        const uploaded = await this.uploadFile(image);
        imageFileId = uploaded.$id;
      }

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdForQueries,
        ID.unique(),
        {
          full_name,
          phone_no,
          ward_no,
          issue_type,
          message,
          image: imageFileId,
          status: "pending",
          submitted_at: new Date().toISOString(),
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
      console.error("Appwrite :: getAllQueries error", error);
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
      console.error("Appwrite :: updateQueryStatus error", err);
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
      console.error("Appwrite :: deleteQuery error", err);
      return false;
    }
  }
}

const service = new Service();
export default service;
