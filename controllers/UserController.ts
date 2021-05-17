import { Request, Response } from 'express';
import { failureResponse, insufficientParameters, mongoError, successResponse } from '../helpers/APIService';
import { IUser } from '../interfaces/IUser';
import UserService from '../services/UserService';

export class UserController {
    private user_service: UserService = new UserService();

    public create_user(req: Request, res: Response) {
        const { name, email, password } = req.body;
        if (name && email && password) {
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
