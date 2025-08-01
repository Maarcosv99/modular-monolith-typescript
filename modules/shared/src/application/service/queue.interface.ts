export interface Queue{
  send(topic:string,messages:{key?:string,value:string}[]):Promise<void>;
  subscribe(topic:string,onMessage:(message:{key?:string,value:string})=>Promise<void>):Promise<void>;
  run(): void;
}

export const QueueSymbol = Symbol.for('Queue');
