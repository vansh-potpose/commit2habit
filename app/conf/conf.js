
const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteTemplatesCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_TEMPLATES_COLLECTION_ID),
    appwriteAbilitiesCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_ABILITIES_COLLECTION_ID),
    appwriteDailyProgressCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_DAILY_PROGRESS_COLLECTION_ID),
    appwriteTasksCollectionId: String(process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID),
    appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    
}

export default conf