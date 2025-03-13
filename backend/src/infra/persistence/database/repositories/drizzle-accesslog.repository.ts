import { Inject, Injectable } from '@nestjs/common';
import { AccessLogRepository } from 'src/application/ports/access-log.repository';
import { AccessLog } from 'src/domain/log/access-log';
import { DrizzleDatabase } from '../database.module';
import { DB_INJECTION_KEY } from '../../utils';
import { AccessLogMapper } from '../mapper/access-log.mapper';
import { accessLogTable } from '../entities/access-log.entity';

@Injectable()
export class AccessLogRepositoryImpl implements AccessLogRepository {
  constructor(@Inject(DB_INJECTION_KEY) private readonly db: DrizzleDatabase) {}
  async create(accesslog: AccessLog): Promise<void> {
    await this.db
      .insert(accessLogTable)
      .values(AccessLogMapper.toDatabase(accesslog));
  }
  findByUserId(userId: number): Promise<AccessLog[]> {
    throw new Error('Method not implemented.');
  }
}
