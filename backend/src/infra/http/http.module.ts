import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/application/use-case/create-user';
import { GetUserUseCase } from 'src/application/use-case/get-user';
import { AppController } from './app.controller';
import { PersistenceModule } from '../persistence/persistence.module';
import { LogoutUseCase } from 'src/application/use-case/logout-user';
import { CreateAccessLogUseCase } from 'src/application/use-case/create-access-log';
import { GetAccessLogUseCase } from 'src/application/use-case/get-access-log';
import { AccessLogController } from './access-log.controller';

@Module({
  imports: [PersistenceModule],
  controllers: [AppController, UserController, AccessLogController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    LogoutUseCase,
    CreateAccessLogUseCase,
    GetAccessLogUseCase,
  ],
  exports: [],
})
export class HttpModule {}
