export class PasswordNotMatchingException extends Error {
  constructor(message: string) {
    super(message);
  }
}