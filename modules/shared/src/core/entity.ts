export abstract class Entity<T> {
  protected readonly _id: string;
  protected readonly _props: T;

  protected constructor(props: T, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this._props = props;
  }

  get id(): string {
    return this._id;
  }
}