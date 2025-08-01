import { QueueSymbol, type Queue } from "@modules/shared/application/service/queue.interface";
import { isSuccess } from "@modules/shared/core/result";
import { UserMapper } from "src/application/mapper/user.mapper";
import { User } from "src/core/entities/user.entity";
import { inject, injectable } from "tsyringe";
import { Producer } from "@modules/shared/queue/producer"

@injectable()
export class UserCreatedProducer implements Producer<User>{
  constructor (
    @inject(QueueSymbol)
    private Queue: Queue,
  ) {}

  execute(user:User){
    const user_raw = UserMapper.toPersistence(user)
    if (isSuccess(user_raw)){
      this.Queue.send('UserCreated',[{value:JSON.stringify(user_raw.value)}])
    }
    else{
      throw user_raw.error
    }
  }
  
}
