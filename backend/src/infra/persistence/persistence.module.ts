import { DynamicModule, Module } from "@nestjs/common";
import { DatabaseModule} from "./database/database.module";
import { UserRepository } from "src/application/ports/user.reporitory";
import { UserRepositoryImpl } from "./database/repositories/drizzle-user.repository";

@Module({
  imports: [
        DatabaseModule.forRoot(process.env.DATABASE_URL!),
    ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl
    }
  ],
  exports: [UserRepository],
})
export class PersistenceModule {
    static forRoot(): DynamicModule {
        return {
            module: PersistenceModule,
            imports: [
                DatabaseModule.forRoot(process.env.DATABASE_URL!),
            ],
        };
    }
}