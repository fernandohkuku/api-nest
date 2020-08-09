import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from "@nestjs/graphql"
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { IdeaModule } from './idea/idea.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { AppController } from './app.controller';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { HttpErrorFilter } from './shared/http-error.filter';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot(),
  GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    context:({req})=>({headers: req.headers})
  }),
    IdeaModule,
    UserModule,
    CommentModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }, {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }],
})
export class AppModule { }
