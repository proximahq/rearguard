import buble from '@rollup/plugin-buble';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.m.js',
      format: 'es',
    },
  ],

  plugins: [
    buble({
      transforms: {
        arrow: false,
        destructuring: false,
        letConst: false,
        parameterDestructuring: false,
      },
    }),
    filesize(),
  ],
};
