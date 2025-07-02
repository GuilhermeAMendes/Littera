import type { CreateUserControllerOutputDTO } from "./createUser.controller.dto";

export const presentCreateUserResponse = ({
  id,
  username,
  email,
  isActive,
}: CreateUserControllerOutputDTO) => {
  const response = {
    id,
    username,
    email,
    isActive,
  } satisfies CreateUserControllerOutputDTO;
  return response;
};
