import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/application/use-case/create-user';
import { GetUserUseCase } from 'src/application/use-case/get-user';
import { AppController } from './app.controller';
import { PersistenceModule } from '../persistence/persistence.module';
import { LogoutUseCase } from 'src/application/use-case/logout-user';

@Module({
  imports: [PersistenceModule],
  controllers: [AppController, UserController],
  providers: [CreateUserUseCase, GetUserUseCase, LogoutUseCase],
  exports: [],
})
export class HttpModule {}
