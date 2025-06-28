export type EitherDirection = "left" | "right";

export class Left<L> {
  readonly tag: EitherDirection = "left";
  constructor(public readonly value: L) {}
}

export class Right<R> {
  readonly tag: EitherDirection = "right";
  constructor(public readonly value: R) {}
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(value: L): Either<L, never> => new Left(value);
export const right = <R>(value: R): Either<never, R> => new Right(value);
