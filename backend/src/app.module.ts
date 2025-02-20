import { Module } from '@nestjs/common';
import { PersistenceModule } from './infra/persistence/persistence.module';
import { UserAuthModule } from './application/user-auth.module';

@Module({
  imports: [
    PersistenceModule.forRoot(),
    UserAuthModule
  ],
})
export class AppModule {}
