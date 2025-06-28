export interface UseCase<InputDTO, OutputDTO> {
  execure(input: InputDTO): Promise<OutputDTO>;
}
