import { Button, createTheme } from "@mantine/core";
import { generateColors } from '@mantine/colors-generator';


export const mantineTheme = createTheme({
  activeClassName: "active",
  autoContrast: true,
  cursorType: "pointer",
  primaryColor: 'ball-yellow',
  primaryShade: 6,
  colors: {
    'ball-yellow': generateColors('#F2CF15'), // shade 6
    'ball-red': generateColors('#C63029'), // shade 7
    'ball-grey': generateColors('#3A403E'), // shade 9
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'ball-red.7',
        size: 'compact-xs',
        variant: 'outline'
      }
    })
  }

});