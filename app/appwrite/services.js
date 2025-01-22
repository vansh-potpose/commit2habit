import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import auth from './auth.js';
import { use } from 'react';

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

    async createTemplate({ max_points, total_points, template_name, click_points, habits }) {
        try {
            habits = JSON.stringify(habits);
            let user_id = (await auth.getCurrentUser()).$id;
            let template_id = ID.unique();
            let result= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTemplatesCollectionId,
                template_id,  // Auto-generate the document ID
                {
                    template_id,
                    user_id,
                    max_points,
                    total_points,
                    template_name,
                    click_points,
                    habits

                }
            );
            result.habits = JSON.parse(result.habits);
            return result;
        } catch (error) {
            console.log("Appwrite service :: createTemplate :: error", error);
            return null;  // Returning null to signify an error
        }
    }

    async updateTemplate({ template_id, user_id, max_points, total_points, template_name, click_points, habits }) {
        try {
            habits = JSON.stringify(habits);
            let result= await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTemplatesCollectionId,
                template_id,
                {
                    template_id,
                    user_id,
                    max_points,
                    total_points,
                    template_name,
                    click_points,
                    habits
                }
            );
            result.habits = JSON.parse(result.habits);
            return result;
        } catch (error) {
            console.log("Appwrite service :: updateTemplate :: error", error);
            return null;  // Returning null to signify an error
        }
    }

    async deleteTemplate(template_id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTemplatesCollectionId,
                template_id
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteTemplate :: error", error);
            return false;  // Returning false to signify failure
        }
    }

    async getTemplate(template_id) {
        try {
            let result= await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTemplatesCollectionId,
                [Query.equal('template_id', template_id)]  // Using Query.equal for better readability
            );
            result.documents[0].habits = JSON.parse(result.documents[0].habits);
            return result.documents[0];
        } catch (error) {
            console.log("Appwrite service :: getTemplate :: error", error, template_id);
            return null;  // Returning null to signify an error
        }
    }

    async getTemplates() {
        try {
            let user_id = (await auth.getCurrentUser()).$id;
            let result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTemplatesCollectionId,
                [Query.equal('user_id', user_id)]  // Using Query.equal for better readability
            );
            for (let i = 0; i < result.documents.length; i++) {
                result.documents[i].habits = JSON.parse(result.documents[i].habits);
            }
            return result;
        } catch (error) {
            console.log("Appwrite service :: getTemplates :: error", error, user_id);
            return null;  // Returning null to signify an error
        }
    }

    // abilitis functions

    async createAbility({ name, current_points, challenges }) {
        try {
            challenges = JSON.stringify(challenges);
            let user_id = (await auth.getCurrentUser()).$id;

            let ability_id = ID.unique();
            let result= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAbilitiesCollectionId,
                ability_id,  // Auto-generate the document ID
                {
                    ability_id,
                    user_id,
                    name,
                    current_points,
                    challenges
                }
            );
            result.challenges = JSON.parse(result.challenges);
            return result;
        } catch (error) {
            console.log("Appwrite service :: createAbility :: error", error);
            return null;  // Returning null to signify an error
        }
    }

    async updateAbility({ ability_id, name, current_points, challenges }) {
        try {
            challenges = JSON.stringify(challenges);
            let user_id = (await auth.getCurrentUser()).$id;
            let result= await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAbilitiesCollectionId,
                ability_id,
                {
                    ability_id,
                    user_id,
                    name,
                    current_points,
                    challenges
                }
            );
            result.challenges = JSON.parse(result.challenges);
            return result;
        } catch (error) {
            console.log("Appwrite service :: updateAbility :: error", error);
            return null;  // Returning null to signify an error
        }
    }

    async deleteAbility(ability_id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAbilitiesCollectionId,
                ability_id
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteAbility :: error", error);
            return false;  // Returning false to signify failure
        }
    }

    async getAbilities() {
        try {
            let user_id = (await auth.getCurrentUser()).$id;

            let result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteAbilitiesCollectionId,
                [Query.equal('user_id', user_id)]  // Using Query.equal for better readability
            );
            for (let i = 0; i < result.documents.length; i++) {
                result.documents[i].challenges = JSON.parse(result.documents[i].challenges);
            }
            return result;
        } catch (error) {
            console.log("Appwrite service :: getAbility :: error", error);
            return null;  // Returning null to signify an error
        }
    }




    // daily progress functions----------------------------------------------
    async createDailyProgress({ template }) {
        try {
            let user_id = (await auth.getCurrentUser()).$id;
            let date = new Date(); // Full ISO format
            console.log("Initial date:", date);

            // Set the time to midnight UTC to ensure consistency across time zones
            date.setUTCHours(0, 0, 0, 0);
            date = date.toISOString(); // Convert to ISO string in UTC
            // Check if a document exists for the given user and date
            let document = await this.getDailyProgress({ date });

            if (document && document.documents.length > 0) {
                // Update the existing document and return it
                return await this.updateDailyProgress({ date, template });
            }

            // Extract template fields
            let { template_id, template_name, habits, max_points, total_points } = template;
            habits = JSON.stringify(habits);

            // Generate a unique ID for the document if not provided
            let daily_progress_id = ID.unique(); // Example: User-based unique ID

            // Create a new document
            console.log("daily_progress_id", habits);
            let result= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDailyProgressCollectionId,
                daily_progress_id,
                {
                    daily_progress_id,
                    user_id,
                    date,
                    template_id,
                    template_name,
                    habits,
                    max_points,
                    total_points
                }
            );
            result.habits = JSON.parse(result.habits);
            return result;
        } catch (error) {
            console.log("Appwrite service :: createDailyProgress :: error", error);
            return null; // Returning null to signify an error
        }
    }


    async getDailyProgressDocuments({ user_id, date }) {
        try {
            let result= await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDailyProgressCollectionId,
                [
                    Query.equal('user_id', user_id),
                    Query.equal('date', date)
                ]
            );
            for (let i = 0; i < result.documents.length; i++) {
                result.documents[i].habits = JSON.parse(result.documents[i].habits);
            }
            return result;
        } catch (error) {
            console.log("Appwrite service :: getDailyProgressDocuments :: error", error);
            return null; // Return null on error
        }
    }



    async deleteDailyProgress(date) {
        try {
            let user_id = (await auth.getCurrentUser()).$id;

            let documents = await this.getDailyProgressDocuments({ user_id, date });

            if (!documents || documents.documents.length === 0) {
                throw new Error("No document found for the given date.");
            }

            for (let doc of documents.documents) {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteDailyProgressCollectionId,
                    doc.$id
                );
            }

            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteDailyProgress :: error", error);
            return false;
        }
    }



    async updateDailyProgress({ date, template }) {
        try {
            let user_id = (await auth.getCurrentUser()).$id;
            date = new Date(date).toISOString();
            
            let documents = await this.getDailyProgressDocuments({ user_id, date });

            if (!documents || documents.documents.length === 0) {
                throw new Error("No document found for the given date.");
            }

            let document = documents.documents[0];

            let { template_id, template_name, habits, max_points, total_points } = template;
            habits = JSON.stringify(habits);

            let result= await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteDailyProgressCollectionId,
                document.$id,
                {
                    template_id,
                    template_name,
                    habits,
                    max_points,
                    total_points
                }
            );
            result.habits = JSON.parse(result.habits);
            return result;
        } catch (error) {
            console.log("Appwrite service :: updateDailyProgress :: error", error);
            return null;
        }
    }



    async getDailyProgress({ date }) {
        try {
            let user_id = (await auth.getCurrentUser()).$id;
            date = new Date(date).toISOString();

            let result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDailyProgressCollectionId,
                [
                    Query.equal('user_id', user_id),
                    Query.equal('date', date)
                ]
            );
            for (let i = 0; i < result.documents.length; i++) {
                result.documents[i].habits = JSON.parse(result.documents[i].habits);
            }
            return result;

        } catch (error) {
            console.log("Appwrite service :: getDailyProgress :: error", error);
            return null;
        }
    }




    async getDailyProgresses() {
        try {
            let user_id = (await auth.getCurrentUser()).$id;

            // Fetch documents and sort by 'date' in descending order (latest first)
            let result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDailyProgressCollectionId,
                [
                    Query.equal('user_id', user_id),    // Filter by user ID
                    Query.orderDesc('date')             // Sort by 'date' field in descending order
                ]
            );

            // Parse habits field to convert JSON string back to an object
            for (let i = 0; i < result.documents.length; i++) {
                result.documents[i].habits = JSON.parse(result.documents[i].habits);
            }

            return result;
        } catch (error) {
            console.log("Appwrite service :: getDailyProgresses :: error", error);
            return null;
        }
    }




    // file upload services-------------------------------------------------------

    async uploadFile(file){
        try {
            let user_id = (await auth.getCurrentUser()).$id;
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                user_id,
                file,
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    async getFile(fileId) {
        try {
            const file = await this.bucket.getFile(
                conf.appwriteBucketId,
                fileId
            );
            return file;
        } catch (error) {
            console.log("Appwrite service :: getFile :: error", error);
            return null;
        }
    }
    
    


    // Task functions--------------------------------------------------------------
    async createTasks(task) {
        try {
            let user_id = (await auth.getCurrentUser()).$id;
            let task_id = ID.unique();
            // Ensure tasks is a valid JSON string
            let tasks =await JSON.stringify(task);
            console.log("tasks in sevives", tasks,task);
    
            let result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTasksCollectionId,
                task_id,
                {
                    user_id,
                    tasks,
                    task_id,
                }
            );
            
            // Parse tasks back if necessary
            result.tasks = JSON.parse(result.tasks);
            return result;
        } catch (error) {
            console.log("Appwrite service :: createTask :: error", error);
            return null;
        }
    }
    
    
    

    async updateTasks( tasks) {
        try {
            let t= await this.getTasks();
            let user_id = t.user_id;
            let task_id = t.task_id;
            
            tasks=JSON.stringify(tasks);
            let result= await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTasksCollectionId,
                task_id,
                {
                    user_id,
                    task_id,
                    tasks 
                }
            );
            result.tasks = JSON.parse(result.tasks);
            return result;
        } catch (error) {
            console.log("Appwrite service :: updateTask :: error", error);
            return null;  // Returning null to signify an error
        }
    }
    
    async deleteTasks(task_id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTasksCollectionId,
                task_id
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteTask :: error", error);
            return false;  // Returning false to signify failure
        }
    }

    async getTasks() {
        try {
            let user_id = (await auth.getCurrentUser()).$id;
    
            let result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTasksCollectionId,
                [Query.equal('user_id', user_id)]
            );
    
            // Safely parse tasks for each document
            result.documents = result.documents.map((doc) => {
                if (doc.tasks) {
                    doc.tasks = JSON.parse(doc.tasks);
                }
                return doc;
            });
            
            return result.documents[0];
        } catch (error) {
            console.log("Appwrite service :: getTask :: error", error);
            return null;
        }
    }
    




}

const service = new Service();
export default service;
