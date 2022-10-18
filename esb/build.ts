import { BuildOptions, BuildResult, build } from 'esbuild';

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import { sassPlugin } from 'esbuild-sass-plugin';

interface BuildEnv {
  env: 'production' | 'development';
}

function buildProps({ env }: BuildEnv): Partial<BuildOptions> {
  return {
    define: { 'process.env.NODE_ENV': `"${env}"` },
    bundle: env.includes('prod'),
    minify: env.includes('prod'),
    sourcemap: env.includes('dev'),
  };
}

export async function buildStyles({
  env,
}: BuildEnv): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ['pkg/res/src/style/index.scss'],
    outfile: 'pkg/app/dist/coma.min.css',
    plugins: [
      sassPlugin({
        async transform(src: string, resolveDir: string): Promise<string> {
          const { css } = await postcss([
            autoprefixer,
            postcssPresetEnv({ stage: 0 }),
          ]).process(src, { from: resolveDir });

          return css;
        },
      }),
    ],
  });
}

export async function buildApp({ env }: BuildEnv): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ['pkg/app/src/index.tsx'],
    outfile: 'pkg/app/dist/coma.min.js',
  });
}

export async function buildServer({
  env,
}: BuildEnv): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ['pkg/svr/src/index.ts'],
    outfile: 'pkg/svr/dist/express.js',
    external: ['express'],
    platform: 'node',
    target: 'node18.10.0',
  });
}

(async function (options: BuildEnv): Promise<void | BuildResult> {
  await Promise.all([
    buildStyles(options),
    buildApp(options),
    buildServer(options),
  ]);
})({ env: 'production' });
