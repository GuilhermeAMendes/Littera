export type CreateUserUseCaseInputDTO = {
  username: string;
  email: string;
  password: string;
};

export type CreateUserUseCaseOutputDTO = {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
};
