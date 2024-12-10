import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import auth from './auth.js';
import { use } from 'react';

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createTemplate({max_points, total_points, template_name, click_points, habits }) {
        try {
            habits = JSON.stringify(habits);
            let user_id = (await auth.getCurrentUser()).$id; 
            let template_id = ID.unique();
            return await this.databases.createDocument(
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
        } catch (error) {
            console.log("Appwrite service :: createTemplate :: error", error);
            return null;  // Returning null to signify an error
        }
    }

    async updateTemplate({ template_id, user_id, max_points, total_points, template_name, click_points, habits }) {
        try {
            habits = JSON.stringify(habits);
            return await this.databases.updateDocument(
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
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                  conf.appwriteTemplatesCollectionId,
                [Query.equal('template_id', template_id)]  // Using Query.equal for better readability
            );
        } catch (error) {
            console.log("Appwrite service :: getTemplate :: error", error,template_id);
            return null;  // Returning null to signify an error
        }
    }

    async getTemplates() {
        try {
            let user_id = (await auth.getCurrentUser()).$id;
            console.log("user_id",user_id);
            let result= await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                  conf.appwriteTemplatesCollectionId,
                [Query.equal('user_id', user_id)]  // Using Query.equal for better readability
            );
            console.log("result",result);
            for (let i = 0; i < result.documents.length; i++) {
                result.documents[i].habits = JSON.parse(result.documents[i].habits);
            }
            return result;
        } catch (error) {
            console.log("Appwrite service :: getTemplates :: error", error,user_id);
            return null;  // Returning null to signify an error
        }
    }
}

const service = new Service();
export default service;
