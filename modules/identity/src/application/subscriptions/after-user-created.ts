import { isSuccess } from "@modules/shared/core/result"; 
import { QueueSymbol, type Queue } from "@modules/shared/application/service/queue.interface";
import {IHandle} from "@modules/shared/core/events/IHandle"
import { DomainEvents } from "@modules/shared/core/events/domain-events";
import { UserCreated } from "src/core/events/user-created.event";
import { inject, injectable } from "tsyringe";
import { UserMapper } from "../mapper/user.mapper";

export const AfterUserCreatedSymbol = Symbol.for("AfterUserCreatedSymbol")

@injectable()
export class AfterUserCreated implements IHandle<UserCreated> {

  constructor (
    @inject(QueueSymbol)
    private Queue: Queue,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name);
  }

  private async onUserCreated (event: UserCreated): Promise<void> {
    const { user } = event;
    const user_raw = UserMapper.toPersistence(user)
    if (isSuccess(user_raw)){
      this.Queue.send('UserCreated',[{value:JSON.stringify(user_raw.value)}])
    }
    else{
      throw user_raw.error
    }
  }
}
