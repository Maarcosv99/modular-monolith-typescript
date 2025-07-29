
import { IDomainEvent } from "./idomains-events";

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
