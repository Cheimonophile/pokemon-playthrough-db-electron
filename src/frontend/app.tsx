import { FC } from "react";

import { createRoot } from 'react-dom/client';




export const App: FC<{}> = () => {
  console.log('👋 This message is being logged by "app.tsx"');
  return (
    <div className="app">
      <h1>App</h1>
    </div>
  );
}




const root = createRoot(document.getElementById('root'));
root.render(<App />);

setTimeout(() => {
  let x = 0;            //break point here
  console.log(x);
}, 3000);