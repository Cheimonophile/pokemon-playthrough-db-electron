import { useDatabase } from "@renderer/hooks/data/useDatabase";
import { PageFC } from "@renderer/interfaces/components/PageFC";
import { MouseEventHandler, useCallback } from "react";
import { BallButton } from "../form/BallButton";
import { useAppContext } from "@renderer/app";



/**
 * Page for the settings of the application
 */
export const SettingsPage: PageFC = () => {

  // context
  const { setIsLoading } = useAppContext();

  /**
   * Get the database
   */
  const databasePath = useDatabase();

  /**
   * Function to create a new database when the create database button is pressed
   */
  const handleOnClickCreateDatabase = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    try {
      setIsLoading(true);
      await window.channels.createDatabase.rendererInvoke();
    }
    finally {
      setIsLoading(false);
    }
  }, [])


  /**
   * Function to open a database when the open database button is pressed
   */
  const handleOnClickOpenDatabase = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    try {
      setIsLoading(true);
      await window.channels.openDatabase.rendererInvoke();
    }
    finally {
      setIsLoading(false);
    }
  }, [])


  return (
    <div className="w-full h-full flex flex-col p-2 gap-2 overflow-y-auto">
      <div className="text-xl">Settings</div>

      {/** Database Section */}
      <div>
        <div className="text-lg">Current Database: {databasePath ?? <i>No Database is Currently Set</i>}</div>

        {/** Buttons */}
        <div className="flex gap-1">
          <BallButton onClick={handleOnClickCreateDatabase} text="Create Database" />
          <BallButton onClick={handleOnClickOpenDatabase} text="Open Database" />
        </div>





      </div>
    </div>
  )

}