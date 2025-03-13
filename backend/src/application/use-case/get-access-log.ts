import { Inject, Injectable } from '@nestjs/common';
import { AccessLogRepository } from '../ports/access-log.repository';
import { AccessLog } from 'src/domain/log/access-log';

interface GetAccessLogCommand {
  userId: number;
}

@Injectable()
export class GetAccessLogUseCase {
  constructor(
    @Inject(AccessLogRepository)
    private readonly accessLogRepository: AccessLogRepository,
  ) {}

  async getAccessLogs({ userId }: GetAccessLogCommand): Promise<AccessLog[]> {
    return this.accessLogRepository.findByUserId(userId);
  }
}
