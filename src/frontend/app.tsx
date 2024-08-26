import { FC } from "react";
import { createRoot } from 'react-dom/client';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./components/shadcn/ui/navigation-menu";




export const App: FC<{}> = () => {
  return (
    <div className="flex flex-col p-2 gap-2">

      {/** Navigation Menu */}
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);