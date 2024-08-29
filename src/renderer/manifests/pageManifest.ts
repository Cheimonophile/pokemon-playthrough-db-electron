import { IconType } from "@renderer/components/Icon";
import { SettingsPage } from "@renderer/components/pages/SettingsPage";
import { PageFC } from "@renderer/interfaces/components/PageFC";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PAGES = [
  "settings",
  "battles",
] as const satisfies string[];


export type Page = typeof PAGES[number];


export interface PageMetadata {

  /**
   * The page's label
   */
  label: string;

  /**
   * The page's icon
   */
  icon: IconType;

  /**
   * The page's component
   */
  Component: PageFC;
}

/**
 * Manifest containing all of the pages available in the application
 */
export const pageManifest: {
  [key in Page]: PageMetadata
} = {
  settings: {
    label: "Settings",
    icon: "Cog6ToothIcon",
    Component: SettingsPage
  },
  battles: {
    label: "Battles",
    icon: "CircleStackIcon",
    Component: SettingsPage
  }
}