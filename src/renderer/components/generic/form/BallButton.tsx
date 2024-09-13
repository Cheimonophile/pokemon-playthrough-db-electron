import { ComponentProps, FC } from "react";
import { Button } from '@headlessui/react';


/**
 * Props for the button component
 */
export interface BallButtonProps extends ComponentProps<typeof Button> {

  /**
   * Click handler
   */
  onClick: ComponentProps<typeof Button>['onClick'];

  /**
   * Button text
   */
  text: string;
}


/**
 * Button component
 */
export const BallButton: FC<BallButtonProps> = ({
  onClick,
  text,
}) => {
  return (
    <Button
      className="bg-ball-red text-white relative hover:after:backdrop-brightness-90 active:after:backdrop-brightness-75 after:absolute after:inset-0 rounded px-2 py-0.5"
      onClick={onClick}>
      {text}
    </Button>
  );
}