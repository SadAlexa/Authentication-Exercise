import { HttpModule } from '../infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [],
})
export class UserAuthModule { }