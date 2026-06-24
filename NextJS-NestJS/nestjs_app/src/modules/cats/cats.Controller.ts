import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from "./cats.service";
import { Cat } from './interfaces/cats.interfaces';

@Controller('cats')
export class CatsController{
    constructor(private catsService: CatsService){}
    
    @Get()
    findAll(): Cat[]{
        return this.catsService.findAll()
    }

    @Post()
    createCat(@Body() createCatDto: CreateCatDto){
        this.catsService.create(createCatDto as Cat)
    }
}