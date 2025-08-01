import { QueueSymbol, type Queue } from "@modules/shared/application/service/queue.interface";
import { isSuccess } from "@modules/shared/core/result";
import { inject, injectable } from "tsyringe";
import { Producer } from "@modules/shared/queue/producer"
import { EmailService, EmailServiceSymbol } from "src/application/services/email.service";

@injectable()
export class UserCreatedConsumer implements Consumer<User>{
  constructor (
    @inject(QueueSymbol)
    private Queue: Queue,
    @inject(EmailServiceSymbol)
    private EmailService: EmailService,
  ) {
    this.setubSubsctions()
  }

  setubSubsctions(): void{
  }

  process(User){
    this.EmailService.send({template:"welcome",})
  }
}
