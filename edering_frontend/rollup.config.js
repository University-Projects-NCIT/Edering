import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';
import path from 'path';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import css from 'rollup-plugin-css-only';

const dir = projectDir => path.resolve(__dirname, projectDir);
const production = !process.env.ROLLUP_WATCH;

const aliases = alias({
  resolve: ['.svelte', '.ts', '.js', '.jsx', '.tsx'],
  entries: [
    { find: '@', replacement: 'src' },
    { find: 'pages', replacement: dir('src/pages') },
    { find: 'types', replacement: dir('src/types') },
    { find: 'config', replacement: dir('src/config') },
    { find: 'graphqlHelper', replacement: dir('src/graphqlHelper') },
    { find: 'pages', replacement: dir('src/pages') },
    { find: 'store', replacement: dir('src/store') },
    { find: 'components', replacement: dir('src/components') },
  ],
});

const configToReplace = {};
for (const [key, v] of Object.entries(config().parsed)) {
  configToReplace[`process.env.${key}`] = `'${v}'`;
}

// const setProcessEnv = () => {
//   return injectProcessEnv(
//     {
//       FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
//       FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
//       FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
//       FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
//       FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
//       FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
//       FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
//     },
//     {
//       exclude: ['**/*.css'],
//     }
//   );
// };

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'app',
    dir: 'public/build',
  },
  plugins: [
    replace({
      include: ['src/**/*.ts', 'src/**/*.svelte'],
      preventAssignment: true,
      values: configToReplace,
    }),
    aliases,
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
    // setProcessEnv(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
