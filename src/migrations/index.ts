import * as migration_20260617_120927 from './20260617_120927';
import * as migration_20260707_120000 from './20260707_120000';
import * as migration_20260708_125058 from './20260708_125058';

export const migrations = [
  {
    up: migration_20260617_120927.up,
    down: migration_20260617_120927.down,
    name: '20260617_120927',
  },
  {
    up: migration_20260707_120000.up,
    down: migration_20260707_120000.down,
    name: '20260707_120000',
  },
  {
    up: migration_20260708_125058.up,
    down: migration_20260708_125058.down,
    name: '20260708_125058'
  },
];
