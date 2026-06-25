import { Body, Controller, Get, Post, Put, Delete, Patch, Param, Query, ValidationPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/user.create.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}
    // @Get()          // Get() => '/users'   || Get('abc') => '/users/abc' 
    // hello() {
    //     return this.userService.getUser()
    // }

    //Param
    // @Get('/:id')
    // getUserById(@Param('id') id: string){
    //     return `Hello User ${id}`
    // }

    //Query
    // @Get()
    // getUserByQuery(@Query() query: any){
    //     return{
    //         keyword: query.keyword,
    //         category: query.category
    //     }
    // }

    @Get()
    findAll(@Req() req: Request & {user: string}){
        console.log(req.user)
        return this.userService.findAll()
    }

    //Body
    @Post()
    createUser(@Body(new ValidationPipe()) body: CreateUserDto){
        return this.userService.createUser(body)
    }

    @Put('/:id')
    editUser(@Body() body: any, @Param('id') id: string){
        return this.userService.editUser(body, id)
    }

    @Patch('/:id')
    editUserPatch(@Body() body: any, @Param('id') id: string){
        return this.userService.editUserPatch(body, id)
    }

    @Delete('/:id')
    deleteUserById(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }

    @Delete()
    deletAll(){
        return this.userService.deleteAll()
    }
}
