import { Document } from 'mongoose'; //Desestructuración  mongoose -> Documents, etc

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
}
