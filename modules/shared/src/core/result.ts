export type Result<T, E> =
  | { success: true, value: T }
  | { success: false, error: E };

export function Success<T, E = never>(value: T): Result<T, E> {
  return { success: true, value };
}

export function Failure<T, E = never>(error: E): Result<T, E> {
  return { success: false, error };
}

export function isSuccess<T, E = never>(result: Result<T, E>): result is { success: true, value: T } {
  return result.success;
}

export function isFailure<T, E = never>(result: Result<T, E>): result is { success: false, error: E } {
  return !result.success;
}