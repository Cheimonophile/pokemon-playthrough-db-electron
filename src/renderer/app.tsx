import { FC } from "react";

import { createRoot } from 'react-dom/client';
import { PkmnDb } from "@renderer/PkmnDb";




export const App: FC<{}> = () => {
  return (
    <div>
      <h1>App</h1>
      <button onClick={() => window.pkmndb}>Press Me</button>
      <p>{PkmnDb.page}</p>
    </div>
  );
}


const root = createRoot(document.getElementById('root'));
root.render(<App />);