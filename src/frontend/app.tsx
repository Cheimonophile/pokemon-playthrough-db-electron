import { FC } from "react";
import { createRoot } from 'react-dom/client';
import { MantineProvider, Tabs } from '@mantine/core';
import { mantineTheme } from "./config/mantineTheme";




export const App: FC<{}> = () => {
  return (
    <MantineProvider theme={mantineTheme}>
      <div>
        <h1 className="bg-blue-500">App</h1>
      </div>

      <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery">
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="messages" >
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings">
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
    </MantineProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);