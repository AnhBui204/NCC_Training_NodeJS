import { DatabaseService } from '@/db/database.service';
import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    // constructor(private readonly db: DatabaseService) { }
    constructor(@InjectModel(User.name)
    private userModel: Model<User>,
        private readonly db: DatabaseService
    ) { }
    // Ex
    getUser() {
        return this.db.findAll()
    }

    //create
    async createUser(data) {
        const user = await this.findUserByEmail(data.email)
        if (user) {
            throw new ConflictException('Email already exists');
        }
        const hashPassword = await bcrypt.hash(data.password, 10)
        data.password = hashPassword
        return this.userModel.create(data)
    }

    //find
    async findAll() {
        return this.userModel.find()
    }

    //edit PUT
    async editUser(data, id) {
        return this.userModel.findByIdAndUpdate(id, data, { new: true })
    }

    //edit PATCH
    async editUserPatch(data, id) {
        return this.userModel.updateOne(
            { _id: id },
            {
                $set: data
            }
        )
    }

    //delete
    async deleteUser(id) {
        return this.userModel.findByIdAndDelete(id)
    }

    async deleteAll() {
        return this.userModel.deleteMany({})
    }



    //find by email
    async findUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email })
        return user
    }

    //validate
    async validateUser(email: string, password: string) {
        const user = await this.findUserByEmail(email)
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        const status = await bcrypt.compareSync(password, user.password)
        if (status) return user
        return null
    }
} 
