import { FC } from "react";
import { createRoot } from 'react-dom/client';




export const App: FC<{}> = () => {
  return (
    <div>
      <h1 className="bg-blue-500">App</h1>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);