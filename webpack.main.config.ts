import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from 'path';

/// 
const CopyPlugin = require("copy-webpack-plugin"); // eslint-disable-line @typescript-eslint/no-require-imports

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new CopyPlugin({
      patterns: [
        { from: 'prisma/migrations', to: 'prisma/migrations' },
        { from: 'prisma/client', to: 'prisma/client' },
      ]
    })

  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      "@prisma": path.resolve(__dirname, 'prisma'),
      "@main": path.resolve(__dirname, 'src/main'),
      "@common": path.resolve(__dirname, 'src/common'),
    }
  },
};
