import { FC } from "react";

import { createRoot } from 'react-dom/client';




export const App: FC<{}> = () => {
  return (
    <div>
      <h1>App</h1>
    </div>
  );
}





const root = createRoot(document.getElementById('root'));
root.render(<App />);