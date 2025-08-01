import { IDomainEvent } from "@modules/shared/core/events/idomains-events";
import { UniqueEntityID } from "@modules/shared/core/unique-entity-id";
import { User } from "../entities/user.entity";

export class UserCreated implements IDomainEvent{
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
