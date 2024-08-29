import { Icon } from "./icons";
import { useAppContext } from "../app";
import { FC, useMemo } from "react";
import { Page, pageManifest } from "@renderer/manifests/pageManifest";


/**
 * Props for the nav button component
 */
export interface NavButtonProps {

  /**
   * The page represented by the nav button
   */
  page: Page;
}



export const NavButton: FC<NavButtonProps> = ({
  page,
}) => {

  // context
  const {
    page: currentPage,
    setPage: setCurrentPage
  } = useAppContext();
  const isCurrentPage = currentPage === page;


  const {
    label,
    icon
  } = useMemo(() => pageManifest[page], [page]);


  const iconStyle = isCurrentPage ? "solid" : "outline";

  return (
    <button
      className="p-2 flex flex-col items-center justify-center overflow-hidden text-ball-yellow relative"
      onClick={() => setCurrentPage(page)}>
      <Icon
        className="size-6"
        style={iconStyle}
        icon={icon}
      />
      <div className="text-xs truncate overflow-hidden w-full text-center">
        {label}
      </div>
      {isCurrentPage && (
        <div className="absolute top-0 right-0 w-1 h-full p-1 bg-ball-red" />
      )}
    </button>
  )
}