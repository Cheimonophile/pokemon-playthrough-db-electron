import { IconType } from "@renderer/components/icons";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PAGES = [
  "settings",
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
}


export const pageManifest: {
  [key in Page]: PageMetadata
} = {
  settings: {
    label: "Settings",
    icon: "Cog6ToothIcon"
  }
}