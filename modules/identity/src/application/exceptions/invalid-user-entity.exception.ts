export class InvalidUserEntityException extends Error {
  constructor(message: string) {
    super(message);
  }
}