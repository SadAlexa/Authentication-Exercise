import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/application/use-case/create-user';
import { GetUserUseCase } from 'src/application/use-case/get-user';
import { AppController } from './app.controller';
import { PersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
    controllers: [AppController, UserController],
    providers: [CreateUserUseCase, GetUserUseCase],
    exports: [],
  })
  export class HttpModule { }