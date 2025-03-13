import { Inject, Injectable } from '@nestjs/common';
import { AccessLogRepository } from '../ports/access-log.repository';
import { AccessLog } from 'src/domain/log/access-log';

interface CreateAccessLogCommand {
  userId: number;
  action: string;
}

@Injectable()
export class CreateAccessLogUseCase {
  constructor(
    @Inject(AccessLogRepository)
    private readonly accessLogRepository: AccessLogRepository,
  ) {}

  async createlogAccess({
    userId,
    action,
  }: CreateAccessLogCommand): Promise<void> {
    const log = new AccessLog({
      userId,
      action,
      timestamp: new Date(),
    });

    return await this.accessLogRepository.create(log);
  }
}
