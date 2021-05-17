import { Request, Response } from 'express';
import { failureResponse, insufficientParameters, mongoError, successResponse, failureAuthentication } from '../helpers/APIService';
import { promisify } from 'util';
import crypto from 'crypto';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/UserService';

export class UserController {
    private user_service: UserService = new UserService();

    //////////////////////////////////////////
    private scrypt = promisify(crypto.scrypt);
    private SALT = 'e7wd2qw9f1g17akiopAT5ffW';
    private hashLength = 64;
    //////////////////////////////////////////
    
    public async create_user(req: Request, res: Response) {
        let { name, email, password } = req.body;
        if (name && email && password) {
            const derivedKey:any = await this.scrypt(password, this.SALT, this.hashLength);
            password = derivedKey.toString('hex');
            const user_params: IUser = {
                name,
                email,
                password
            };            
            this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('register user successfully', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public log_in(req: Request, res: Response) {
        let { email, password } = req.body;
        if (email && password) {
            const user_filter = { email: email };
            this.user_service.searchUser(user_filter, async (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if(user_data){
                        const dbHash = Buffer.from(user_data.password,'hex');
                        const derivedKey:any = await this.scrypt(password, this.SALT, this.hashLength);
                        const verified = crypto.timingSafeEqual(dbHash, derivedKey);
                        if (verified){
                            successResponse('user logged successfully', null, res);
                        }else{
                            failureAuthentication('log in failed. wrong email or password',null,res);
                        }
                    }else{
                        failureAuthentication('user not registered',null,res);
                    }                                       
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_by_email(req: Request, res: Response) {
        if (req.params.email) {
            const user_filter = { email: req.params.email };
            this.user_service.searchUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    if(user_data){
                        successResponse('get user successfully', user_data, res);
                    }else{
                        failureResponse('user doesnt exist',null,res);
                    }                    
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.searchUser(user_filter, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfully', user_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_user(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const _id = req.params.id;

        if (_id && name && email && password) {
            this.user_service.searchUser(_id, (err: any, user_data: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else if (user_data) {
                    const user_params: IUser = {
                        _id,
                        name,
                        email,
                        password
                    };
                    this.user_service.updateUser(user_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update user successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        const _id = req.params.id;
        if (_id) {
            this.user_service.deleteUser(_id, (err: any, delete_details: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete user successfully', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}
