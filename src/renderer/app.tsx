import { FC } from "react";

import { createRoot } from 'react-dom/client';
import { PkmnDb } from "@renderer/PkmnDb";




export const App: FC = () => {
  return (
    <div>
      <h1>App</h1>
      <button onClick={() => window.bridge}>Press Me</button>
      <p>{PkmnDb.page}</p>
      <p>{window.location.href}</p>
    </div>
  );
}


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<App />);
}