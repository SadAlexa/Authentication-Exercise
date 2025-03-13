import { Entity } from 'src/core/entities/entity';

export interface AccessLogProps {
  id?: number;
  userId: number;
  action: string;
  timestamp?: Date;
}

export class AccessLog extends Entity<AccessLogProps> {
  private id?: number;
  private userId: number;
  private action: string;
  private timestamp?: Date;

  constructor(props: AccessLogProps) {
    super(props);
    this.id = props.id;
    this.userId = props.userId;
    this.action = props.action;
    this.timestamp = props.timestamp;
  }

  getUserId(): number {
    return this.userId;
  }

  getAction(): string {
    return this.action;
  }

  setId(id: number): void {
    this.id = id;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  setAction(action: string): void {
    this.action = action;
  }

  setTimestamp(timestamp: Date): void {
    this.timestamp = timestamp;
  }
}
