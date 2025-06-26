const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionIdForQueries: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_FOR_QUERIES),
    appwriteCollectionIdForUpdates: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_FOR_UPDATEDS),
    appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    appwriteSecretCode: String(process.env.NEXT_PUBLIC_APPWRITE_SECRET_CODE)
};

export default conf;
