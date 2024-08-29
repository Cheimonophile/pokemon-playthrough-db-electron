import { FC } from "react";
import { NavButton } from "./NavButton";


export const Nav: FC = () => {
  return (
    <div className="w-20 flex flex-col bg-ball-grey">

      <div className="flex-1" />

      {/** Settings Panel */}
      <NavButton
        page="settings"
      />

    </div>
  )
}