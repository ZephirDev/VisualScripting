import { SettingInterface } from "./setting.interface";

export interface SettingsInterface {
  section: string,
  settings: SettingInterface[],
};
