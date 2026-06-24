import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}
    @Get()          // Get() => '/users'   || Get('abc') => '/users/abc' 
    hello() {
        return this.userService.getUser()
    }
}
