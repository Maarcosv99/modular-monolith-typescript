import type { RestRoute } from '@modules/shared/http/rest/rest';


export interface IModule {
  routes: RestRoute[];
  //queue: Queue[];
}