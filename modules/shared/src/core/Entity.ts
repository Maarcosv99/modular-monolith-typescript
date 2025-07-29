import { UniqueEntityID } from './unique-entity-id';

const isEntity = (v: any): v is Entity<any, any> => {
  return v instanceof Entity;
};

export abstract class Entity<T, ID = UniqueEntityID> {
  protected readonly _id: ID;
  public readonly props: T;

  constructor (props: T, id?: ID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals (object?: Entity<T, ID>) : boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
