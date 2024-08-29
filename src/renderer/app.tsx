import { createContext, FC, useContext, useMemo, useState } from "react";

import { createRoot } from 'react-dom/client';

import { Nav } from './components/Nav'
import { Page, pageManifest } from './manifests/pageManifest'


/**
 * Context for the app
 */
const AppContext = createContext<{
  page: Page;
  setPage: (page: Page) => void;
} | null>(null);


/**
 * Get the context of the app component
 */
export const useAppContext = () => {
  const appContextState = useContext(AppContext);
  if (!appContextState) {
    throw new Error("App context not found");
  }
  return appContextState;
}


/**
 * Core component of the application
 */
export const App: FC = () => {
  const [page, setPage] = useState<Page>("settings");

  const { Component: PageComponent } = useMemo(() => pageManifest[page], [page]);

  return (
    <AppContext.Provider value={{ page, setPage }}>
      <div className="w-full h-full flex flex-row">

        {/** Sidebar */}
        <Nav />

        {/** Main content */}
        <div className="flex-1 overflow-hidden">
          <PageComponent />
        </div>

      </div>
    </AppContext.Provider>
  );
}



const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<App />);
}