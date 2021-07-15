export interface MessageInterface<ParametersType = void> {
    id: string,
    method: string,
    parameters?: ParametersType
}