import { useDatabase } from "@renderer/hooks/data/useDatabase";
import { PageFC } from "@renderer/interfaces/components/PageFC";
import { observer } from "@renderer/observer";
import { MouseEventHandler, useCallback } from "react";



/**
 * Page for the settings of the application
 */
export const SettingsPage: PageFC = () => {

  /**
   * Get the database
   */
  const databasePath = useDatabase();

  /**
   * Function to create a new database when the create database button is pressed
   */
  const onClickCreateDatabase = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    await window.channels.createDatabase.invoke();
    await observer.notify();
  }, [])


  return (
    <div className="w-full h-full flex flex-col p-2 gap-2 overflow-y-auto">
      <div className="text-xl">Settings</div>

      {/** Database Section */}
      <div>
        <div className="text-lg">Current Database: {databasePath ?? <i>No Database is Currently Set</i>}</div>
        <button onClick={onClickCreateDatabase} className="px-2 py-0.5 border rounded">Create Database</button>
        <div>́


        </div>




      </div>
    </div>
  )

}