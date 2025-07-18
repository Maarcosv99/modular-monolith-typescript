export class UserCreatedEvent {
  private constructor(public readonly userId: string) {}

  static create(userId: string): UserCreatedEvent {
    return new UserCreatedEvent(userId);
  }

  toJson(): string {
    return JSON.stringify({
      userId: this.userId,
    });
  }
}