import { InferSelectModel } from 'drizzle-orm';
import { AccessLog } from 'src/domain/log/access-log';
import { accessLogTable } from '../entities/access-log.entity';

export type AccessLogType = InferSelectModel<typeof accessLogTable>;

export class AccessLogMapper {
  static toDomain(accessLogEntity: AccessLogType): AccessLog {
    const model = new AccessLog({
      id: accessLogEntity.id,
      userId: accessLogEntity.userId,
      action: accessLogEntity.action || '',
    });
    return model;
  }

  static toDatabase(accessLog: AccessLog) {
    return {
      userId: accessLog.getUserId(),
      action: accessLog.getAction(),
    };
  }
}
