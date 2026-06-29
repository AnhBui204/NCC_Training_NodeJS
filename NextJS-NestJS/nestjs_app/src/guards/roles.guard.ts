import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "@/decorators/roles.decorator";
import { Observable } from "rxjs";

@Injectable()
export class RolesAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const hasRole = requiredRoles.includes(user?.role);
        if (!hasRole) {
            throw new ForbiddenException('Bạn không có quyền Admin để thực hiện hành động này!');
        }
        return true;
    }
}