import { usePlaythroughs } from "@renderer/hooks/data/playthrough";
import { FC, useMemo } from "react";
import { GTable, GTableColumn } from "../GTable";



/**
 * Table for playthroughs
 */
export const PlaythroughsTable: FC = () => {


  const playthroughs = usePlaythroughs();


  /**
   * List of the playthrough ids
   */
  const playthroughIds = useMemo(() => playthroughs?.map(playthrough => playthrough.idNo) ?? [], [playthroughs])

  /**
   * List of the playthrough ids
   */
  const playthroughsMap = useMemo(() => {
    return new Map(playthroughs?.map(playthrough => [playthrough.idNo, playthrough]) ?? [])
  }, [playthroughs])


  /**
   * Columns for the playthroughs table
   */
  const columns = useMemo((): GTableColumn<string>[] => [
    {
      label: "Name",
      width: "10rem",
      renderer: id => playthroughsMap.get(id)?.name ?? ""
    },
    {
      label: "Version",
      width: "7rem",
      renderer: id => playthroughsMap.get(id)?.version.name ?? "???"
    },
    {
      label: "Adventure Started",
      width: "10rem",
      renderer: id => playthroughsMap.get(id)?.adventureStarted.toLocaleDateString() ?? ""
    }
  ], [playthroughsMap])



  return (
    <GTable
      columns={columns}
      ids={playthroughIds}
    />
  )


};