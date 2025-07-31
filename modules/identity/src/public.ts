// Export type, interfaces, enums, and client services that are public

import { AuthenticatedMiddleware } from 'http/rest/middlewares/authenticated.middleware';
import { UserCreatedEvent } from './core/events/user-created.event';

export default {
  middlewares: {
    AuthenticatedMiddleware
  },
  events: {
    UserCreatedEvent
  }
};};
