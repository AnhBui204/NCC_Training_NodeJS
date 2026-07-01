import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesAuthGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get()
    @UseGuards(JwtAuthGuard, RolesAuthGuard)
    @Roles('ADMIN')
    adminFindAll(@Req() req: Request & { user: string }) {
        return this.adminService.adminFindAll()
    }
}
