export class InvalidUserDataException extends Error {
  constructor(message: string) {
    super(message);
  }
}