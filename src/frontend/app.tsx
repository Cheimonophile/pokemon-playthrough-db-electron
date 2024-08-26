import { FC, useState } from "react";
import { createRoot } from 'react-dom/client';
import { Button, Container, Flex, MantineProvider, ScrollAreaAutosize, Tabs } from '@mantine/core';
import { mantineTheme } from "./config/mantineTheme";


const values = ['1', '2', '3'] as const satisfies string[];

type Values = typeof values[number]



export const App: FC<{}> = () => {

  /**
   * The currently active page of the application
   */
  const [activeTab, setActiveTab] = useState<Values | null>(null);

  return (
    <MantineProvider theme={mantineTheme}>

      <Flex
        direction="column">

        {/** Nav Bar */}
          <Tabs
            value={activeTab}
            onChange={(v) => setActiveTab(values.find(inlist => inlist === v))}>
            <Tabs.List>
              <Tabs.Tab value="1" size="compact-xs">
                Gallery
              </Tabs.Tab>
              <Tabs.Tab value="2" >
                Messages
              </Tabs.Tab>
              <Tabs.Tab value="3">
                Settings
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

        <Button size="compact-xs">Press me to see active styles</Button>

      </Flex>

    </MantineProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);