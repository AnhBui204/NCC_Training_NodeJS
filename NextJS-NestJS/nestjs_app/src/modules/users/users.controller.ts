import { Body, Controller, Get, Post, Put, Delete, Patch, Param, Query, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateUserDto from './dto/user.create.dto';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesAuthGuard } from '@/guards/roles.guard';
import { ParseMongoIdPipe } from '@/pipes/parse-mongo-id.pipe';
import { TrimPipe } from '@/pipes/trim.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    // @Get()          // Get() => '/users'   || Get('abc') => '/users/abc' 
    // hello() {
    //     return this.userService.getUser()
    // }

    //Param
    @Get('/:id')
    getUserById(@Param('id', ParseMongoIdPipe) id: string) {
        return this.userService.getUserById(id)
    }

    //Query
    // @Get()
    // getUserByQuery(@Query() query: any){
    //     return{
    //         keyword: query.keyword,
    //         category: query.category
    //     }
    // }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req: Request & { user: string }) {
        return this.userService.findAll()
    }

    @Get('/name/:name')
    @UseGuards(JwtAuthGuard)
    getUserByName(@Param('name') name: string) {
        return this.userService.getUserByName(name)
    }

    //Body
    @Post()
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @Roles('ADMIN')
    createUser(@Body(new TrimPipe(), new ValidationPipe()) body: CreateUserDto) {
        return this.userService.createUser(body)
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @Roles('ADMIN')
    editUser(@Body() body: any, @Param('id') id: string) {
        return this.userService.editUser(body, id)
    }

    @Patch('/:id')
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @Roles('ADMIN')
    editUserPatch(@Body() body: any, @Param('id') id: string) {
        return this.userService.editUserPatch(body, id)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @Roles('ADMIN')
    deleteUserById(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }

    @Delete()
    deletAll() {
        return this.userService.deleteAll()
    }
}
