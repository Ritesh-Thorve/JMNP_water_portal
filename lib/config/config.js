const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionIdForQueries: String(VITE_APPWRITE_COLLECTION_ID_FOR_QUERIES),
    appwriteCollectionIdForUpdates: String(VITE_APPWRITE_COLLECTION_ID_FOR_UPDATEDS),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
 

export default conf