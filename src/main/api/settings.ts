
import { Sema } from 'async-sema';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';


/**
 * The path to the settings file
 */
const SETTINGS_FILEPATH = path.join(app.getPath('userData'), 'settings.json');


/**
 * Semaphore to prevent concurrent access to the settings file
 */
const settingsSema = new Sema(1);



/**
 * Fetch the settings object of the application
 */
async function getSettings(): Promise<Record<string, unknown>> {
  try {
    await fs.promises.mkdir(app.getPath('userData'), { recursive: true });
    const settingsJson = await fs.promises.readFile(SETTINGS_FILEPATH, 'utf-8');
    const settings = JSON.parse(settingsJson);
    if (typeof settings !== 'object') {
      throw new Error('Invalid settings file');
    }
    return settings;
  }
  catch (error) {
    console.error(error);
    return {};
  }
}


/**
 * Set the settings of the application
 */
async function setSettings(settings: Record<string, unknown>) {
  try {
    const settingsJson = JSON.stringify(settings, null, 2);
    await fs.promises.writeFile(SETTINGS_FILEPATH, settingsJson);
  }
  catch (caught) {
    console.error('Failed to save settings.', caught);
  }
}





/**
 * Creates a function to get and set a setting
 */
function makeSetting<T>(key: string, params: {
  get: (value: unknown) => T;
  set: (value: T) => unknown;
}): Setting<T> {
  return {
    get: async () => {
      try {
        const settings = await getSettings();
        const unknownSetting = settings[key];
        const setting = params.get(unknownSetting);
        return setting;
      }
      catch (caught) {
        console.error(`Failed to get setting '${key}'`, caught);
        return undefined;
      }
    },
    set: async (value: T | undefined) => {
      await settingsSema.acquire();
      try {
        const settings = await getSettings();
        if (value === undefined) {
          delete settings[key];
        }
        else {
          settings[key] = params.set(value);
        }
        await setSettings(settings);
      }
      catch (caught) {
        console.error(`Failed to set setting '${key}'`, caught);
      }
      finally {
        settingsSema.release();
      }
    },
  }
}

/**
 * A setting of the application that can be get and set
 */
interface Setting<T> {

  /**
   * Get the value of a setting
   * 
   * @returns the setting value, null if the setting doesn't exist or there's an error
   */
  readonly get: () => Promise<T | undefined>;

  /**
   * Set the value of a setting
   * 
   * does not throw an error if the setting doesn't exist
   * 
   * @param value 
   * 
   * @returns 
   */
  readonly set: (value: T | undefined) => Promise<void>;
}



/**
 * The settings of the application
 */
export const settings = Object.freeze({

  /**
   * The path to the database file
   */
  dbFilepath: makeSetting<string | null>('dbFilepath', {
    get: (value) => typeof value === 'string' ? value : null,
    set: (value) => value,
  }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<string, Setting<any>>);