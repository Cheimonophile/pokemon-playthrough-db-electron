import { PageFC } from "@renderer/interfaces/components/PageFC";
import { PlaythroughsTable } from "../tables/PlaythroughsTable";


/**
 * Page for the playthroughs of the application
 */
export const PlaythroughsPage: PageFC = () => {


  return (
    <div className="w-full h-full flex flex-col gap-2">

      {/** Form Box */}


      {/** Playthrough Table */}
      <div className="flex-1 overflow-hidden">
        <PlaythroughsTable />
      </div>

    </div>
  )
}