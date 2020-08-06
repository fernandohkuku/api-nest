import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from "@nestjs/common"

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter{
    catch(exception:HttpException, host:ArgumentsHost){
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const status = exception.getStatus();
        const errorResponse = {
            code:status, 
            timestamp:new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message || exception.name || null
        }

        Logger.error(`${request.method} ${request.url}`,JSON.stringify(errorResponse), "ExceptionFilter")
        response.status(404).json(errorResponse)
    }
}