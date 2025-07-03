import type { LoginUserControllerOutputDTO } from "./loginUser.controller.dto";

export const presentLoginUserResponse = ({
  token,
}: LoginUserControllerOutputDTO) => {
  const response = {
    token,
  } satisfies LoginUserControllerOutputDTO;
  return response;
};
