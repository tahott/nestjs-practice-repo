import { Inject, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RedisClient } from 'redis';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { REDIS, RedisModule } from './redis';

@Module({
  imports: [AuthModule, RedisModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: RedisClient
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis, logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 5,
          }
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
