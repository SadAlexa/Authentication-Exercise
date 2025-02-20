import { DynamicModule, Module } from "@nestjs/common";
import { DatabaseModule} from "./database/database.module";

@Module({
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