import moongose from "mongoose";

interface IUsersSchema{
    nombre : String,
    nombre2 : String
};

interface IUsersModel extends moongose.Model<IUsersDoc>{
    checks(attr:IUsersSchema) : IUsersDoc;
};

interface IUsersDoc extends moongose.Document{
    nombre: String
    nombre2 : String
};

const UsersSchema = new moongose.Schema({
    /*nombre : String,
    required : true*/
    nombre : {type:String,required:true},
    nombre2 : {type:String,required:true}
});

const UserModel = moongose.model<IUsersDoc,IUsersModel>('Users',UsersSchema,'Users');

UsersSchema.statics.checks = (attr:IUsersSchema)=>{
    return new UserModel(attr);
}

//UserModel.checks({nombre:'mau', nombre2:'mau'})
//UserModel.checks({nombre:'mau'});

export {UserModel};