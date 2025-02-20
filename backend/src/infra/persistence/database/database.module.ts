import { Module } from '@nestjs/common';
import { DB_INJECTION_KEY } from './utils';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './entities/index';
import { Migrator } from './services/migration.service';

export function makeDrizzle(dbConnectionString: string) {
    return drizzle(dbConnectionString, { schema });
}

export type DrizzleDatabase = ReturnType<typeof makeDrizzle>;

@Module({})
export class DatabaseModule {
    static forRoot(
        dbConnectionString: string,
    ) {
        return {
            global: true,
            module: DatabaseModule,
            providers: [
                {
                    provide: DB_INJECTION_KEY,
                    useFactory: async () => {
                        return makeDrizzle(dbConnectionString);
                    },
                },
                Migrator,
            ],
            exports: [DB_INJECTION_KEY, Migrator],
        };
    }
    
    static async forRootAsync( asyncOptions: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useFactory: (...args: Array<any>) => {
            dbConnectionString: string;
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        inject?: Array<any>;

    }) {
        return {
            global: true,
            module: DatabaseModule,
            providers: [
                {
                    provide: DB_INJECTION_KEY,
                    useFactory: (...args: unknown[]) => {
                        const { dbConnectionString } = asyncOptions.useFactory(
                            ...args
                        );
                        return makeDrizzle(dbConnectionString);
                    },
                    inject: asyncOptions.inject || [],
                },
                Migrator,
            ],
            exports: [DB_INJECTION_KEY, Migrator],
        };
    }
}
