import { IDomainEvent } from "@modules/shared/core/events/IDomainEvent";
import { UniqueEntityID } from "@modules/shared/core/UniqueEntityID";
import { User } from "../entities/user.entity";

export class UserCreatedEvent implements IDomainEvent{
  public dateTimeOccurred: Date;
  public user: User;

  constructor (user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.user.id;
  }
}
