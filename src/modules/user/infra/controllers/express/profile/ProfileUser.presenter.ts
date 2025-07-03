import type { ProfileUserControllerOutputDTO } from "./profileUser.controller.dto";

export const presentCreateUserResponse = ({
  id,
  username,
  email,
  isActive,
}: ProfileUserControllerOutputDTO) => {
  const response = {
    id,
    username,
    email,
    isActive,
  } satisfies ProfileUserControllerOutputDTO;
  return response;
};
