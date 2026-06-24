import { DatabaseService } from '@/db/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private readonly db: DatabaseService){}
    getUser() {
        return this.db.findAll()
    }
}
