import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { retry } from 'rxjs';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // const isAuth = false
    // if(!isAuth){
    //   return res.status(HttpStatus.UNAUTHORIZED).json({
    //     message: "Unauthorized"
    //   })
    // }
    // req.user = "ABC"
    next();
  }
}
