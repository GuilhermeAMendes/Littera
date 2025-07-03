export type ProfileUserUseCaseInputDTO = {
  userId: string;
};

export type ProfileUserUseCaseOutputDTO = {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
};
