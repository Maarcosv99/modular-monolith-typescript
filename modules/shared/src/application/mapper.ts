import { Result } from 'core/result';

export abstract class Mapper<Entity, Persistence, Errors = Error> {
  abstract toDomain(raw: any): Result<Entity, Errors>
  abstract toPersistence(domain: Entity): Result<Persistence, Errors>
}
