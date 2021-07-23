import { TypeName } from "./type-name";

export interface SettingInterface {
  name: string,
  readonly: boolean,
  type: TypeName<SettingInterface['value']>;
  value: string | number | boolean,
}
