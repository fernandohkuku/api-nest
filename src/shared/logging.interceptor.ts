import { NestInterceptor, ExecutionContext, Injectable, CallHandler, Logger } from "@nestjs/common"
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(
        _context:ExecutionContext,
        _call$: CallHandler
    ):Observable<any>{
        const req = _context.switchToHttp().getRequest();
        if(req){
            const method = req.method;
            const url = req.url;
            const now  = Date.now();
    
            return _call$.handle().pipe(
                tap(()=> Logger.log(`${method} ${url} ${Date.now()-now}ms`,_context.getClass().name))
            )
        }else{
            return _call$.handle();
        }
        
    }
}