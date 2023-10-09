import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.js',
    output: {
      format: 'es',
      file: 'dist/discord-markdown.min.js',
      name: 'discord-markdown',
    },
    plugins: [
      nodeResolve({browser: true}),
      commonjs(),
      terser(),
    ],
  },
];
