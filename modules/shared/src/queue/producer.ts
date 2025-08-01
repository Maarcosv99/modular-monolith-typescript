export interface Producer<T>{
  execute(message:T)
}
