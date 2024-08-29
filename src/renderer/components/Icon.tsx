


import * as Solid from '@heroicons/react/24/solid'
import * as Outline from '@heroicons/react/24/outline'
import { FC } from 'react'


/**
 * The type of the icon.
 */
export type IconType = keyof typeof Solid & keyof typeof Outline


/**
 * Export the icon components
 */
export {
  Solid,
  Outline
}

/**
 * Props for the icon component
 */
export interface IconProps {

  /**
   * Whether the icon is solid or outline
   */
  style: "solid" | "outline";

  /**
   * The icon to render
   */
  icon: IconType;

  /**
   * The class name of the icon
   */
  className?: string;
}


/**
 * Icon Component
 */
export const Icon: FC<IconProps> = ({
  style,
  icon,
  className
}) => {

  /*eslint import/namespace: ['error', { allowComputed: true }]*/
  const Icon = style === "solid" ? Solid[icon] : Outline[icon];

  return (
    <Icon className={className} />
  )
}