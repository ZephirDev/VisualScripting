import * as fs from 'fs';
import { VersionableInterface } from './common/types/versionable.interface';

export const Version : VersionableInterface['version'] = (() => {
    let packageJson: any = JSON.parse(fs.readFileSync(`${__dirname}/package.json`, 'utf-8'));
    let versions = packageJson.version.split(/[.]+/);
    if (versions) {
        return {major: Number.parseInt(versions[0]), minor: Number.parseInt(versions[1]), patch: Number.parseInt(versions[2])};
    } else {
        return {major: 0, minor: 0, patch: 0};
    }
})();