import { useDatabase } from "@renderer/hooks/data/useDatabase";
import { PageFC } from "@renderer/interfaces/components/PageFC";



/**
 * Page for the settings of the application
 */
export const SettingsPage: PageFC = () => {

  /**
   * Get the database
   */
  const databasePath = useDatabase();


  return (
    <div className="w-full h-full flex flex-col p-2 gap-2 overflow-y-auto">
      <div className="text-xl">Settings</div>

      {/** Database Section */}
      <div>
        <div className="text-lg">Current Database: {databasePath ?? <i>No Database is Currently Set</i>}</div>
        <div>́


        </div>




      </div>
    </div>
  )

}