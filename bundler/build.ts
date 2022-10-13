import { BuildResult, build } from 'esbuild';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { sassPlugin } from 'esbuild-sass-plugin';

interface BuildOptions {
  env: 'production' | 'development';
}

function buildProps({ env }: BuildOptions) {
  return {
    define: { 'process.env.NODE_ENV': `"${env}"` },
    bundle: env.includes('prod'),
    minify: env.includes('prod'),
    sourcemap: env.includes('dev'),
  };
}

export async function buildStyles({
  env,
}: BuildOptions): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ['source/resources/src/styles/index.scss'],
    outfile: 'source/app/dist/styles.min.css',
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
  });
}

export async function buildApp({
  env,
}: BuildOptions): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ['source/app/src/index.tsx'],
    outfile: 'source/app/dist/scripts.min.js',
  });
}

export async function buildServer({
  env,
}: BuildOptions): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ['source/server/src/index.ts'],
    outfile: 'source/server/dist/express.js',
    external: ['express'],
    platform: 'node',
    target: 'node18.10.0',
  });
}

(async function (options: BuildOptions): Promise<void | BuildResult> {
  await Promise.all([
    buildStyles(options),
    buildApp(options),
    buildServer(options),
  ]);
})({ env: 'production' });
