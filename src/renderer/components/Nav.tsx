import { FC } from "react";
import { NavButton } from "./NavButton";


export const Nav: FC = () => {
  return (
    <div className="w-16 flex flex-col bg-ball-grey">
      <NavButton page="battles" />
      <div className="flex-1" />
      <NavButton page="settings" />
    </div>
  )
}