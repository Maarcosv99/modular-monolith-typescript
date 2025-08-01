import { ConfigEnvSymbol } from '@modules/shared/config/env';
import type { ConfigEnv } from '@modules/shared/config/env';

import { Queue } from "@/application/service/queue.interface";
import { type Producer, type Consumer, Kafka } from "kafkajs"
import { inject, injectable } from "tsyringe";

export const KafkaServiceSymbol = Symbol.for('KafkaServiceSymbol');

type messageCallback = (message:{key?:string,value:string})=>Promise<void>

@injectable()
export class KafkaService implements Queue{

  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  private static handlersMap:{[key:string]:messageCallback[]} = {};

  constructor(
    @inject(ConfigEnvSymbol)
    private env: ConfigEnv,
  ){
    this.kafka = new Kafka({clientId:this.env.kafka.client_id,brokers:this.env.kafka.brokers})
  }

  async send(topic: string ,messages: { key?: string; value: string;}[]): Promise<void>{
    if (!this.producer){
      this.producer = this.kafka.producer()
      this.producer.connect()
    }
    this.producer.send({topic,messages})
  }

  async subscribe(topic:string,onMessage:messageCallback){
    if (!KafkaService.handlersMap.hasOwnProperty(topic)) {
      KafkaService.handlersMap[topic] = [];
    }
    KafkaService.handlersMap[topic].push(onMessage);
  }

  run(){
    if (!this.consumer){
      this.consumer = this.kafka.consumer({groupId:this.env.kafka.group_id})
      this.consumer.connect()
    }
    this.consumer.run({eachMessage:async({topic,message,partition})=>{
      const input = {key:message.key.toString(),value:message.value.toString(),partition:partition,timestamp:message.timestamp}
      const handlers = KafkaService.handlersMap[topic] ?? [];
      await Promise.all(handlers.map(target=>target(input)))
    }})
  }
}
