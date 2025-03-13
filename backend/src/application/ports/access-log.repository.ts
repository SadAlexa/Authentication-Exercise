import { AccessLog } from 'src/domain/log/access-log';

export abstract class AccessLogRepository {
  abstract create(accesslog: AccessLog): Promise<void>;
  abstract findByUserId(userId: number): Promise<AccessLog[]>;
}
