import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/users.schema';
import { Model } from 'mongoose';


@Injectable()
export class AdminService {
    constructor(@InjectModel(User.name)
    private userModel: Model<User>) { }

    async adminFindAll() {
        return this.userModel.find()
    }
}
