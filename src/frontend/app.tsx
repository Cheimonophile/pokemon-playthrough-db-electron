import { FC } from "react";
import { createRoot } from 'react-dom/client';




export const App: FC<{}> = () => {
  return (
    <div className="flex flex-col">

      {/** Navigation Menu */}
      <h1 className="bg-primary text-primary-foreground">App</h1>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);