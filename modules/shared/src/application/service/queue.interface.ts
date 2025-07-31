export interface Queue{
  send(topic:string,messages:{key?:string,value:string,partition?:number,timestamp?:string}[]):Promise<void>;
  subscribe(topic:string,onMessage:(message:{key?:string,value:string,partition?:number,timestamp?:string})=>Promise<void>):Promise<void>;
}

export const QueueSymbol = Symbol.for('Queue');
