export type LoginUserUseCaseInputDTO = {
  email: string;
  password: string;
};

export type LoginUserUseCaseOutputDTO = {
  token: string;
};
