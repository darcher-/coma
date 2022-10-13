import autoprefixer from 'autoprefixer';
import { build } from 'esbuild';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { sassPlugin } from 'esbuild-sass-plugin';

interface BuildOptions {
  env: 'production' | 'development';
}

export async function buildStyles(options: BuildOptions) {
  const { env } = options;

  await build({
    entryPoints: ['source/resources/src/styles/index.scss'],
    outfile: 'source/app/dist/styles.min.css',
    define: {
      'process.env.NODE_ENV': `"${env}"`,
    },
    plugins: [
      sassPlugin({
        async transform(source: string, resolveDir: string): Promise<string> {
          const { css } = await postcss([
            autoprefixer,
            postcssPresetEnv({ stage: 0 }),
          ]).process(source, { from: resolveDir });

          return css;
        },
      }),
    ],
    bundle: true,
    minify: false,
    sourcemap: false,
  });
}

export async function buildApp(options: BuildOptions) {
  const { env } = options;

  await build({
    entryPoints: ['source/app/src/index.tsx'],
    outfile: 'source/app/dist/scripts.min.js',
    define: {
      'process.env.NODE_ENV': `"${env}"`,
    },
    bundle: true,
    minify: false,
    sourcemap: false,
  });
}

export async function buildServer(options: BuildOptions) {
  const { env } = options;

  await build({
    entryPoints: ['source/server/src/index.ts'],
    outfile: 'source/server/dist/express.js',
    define: {
      'process.env.NODE_ENV': `"${env}"`,
    },
    external: ['express'],
    platform: 'node',
    target: 'node18.10.0',
    bundle: true,
    minify: false,
    sourcemap: false,
  });
}

async function buildAll() {
  await Promise.all([
    buildStyles({
      env: 'production',
    }),
    buildApp({
      env: 'production',
    }),
    buildServer({
      env: 'production',
    }),
  ]);
}

buildAll();
