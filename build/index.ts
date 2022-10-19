import { BuildOptions, BuildResult, build } from "esbuild";

import autoprefixer from "autoprefixer";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";
import { sassPlugin } from "esbuild-sass-plugin";

interface BuildEnv {
  env: "production" | "development";
}

function buildProps({ env }: BuildEnv): Partial<BuildOptions> {
  return {
    define: { "process.env.NODE_ENV": `"${env}"` },
    bundle: env.includes("prod"),
    minify: env.includes("prod"),
    sourcemap: env.includes("dev"),
  };
}

export async function buildStyles({
  env,
}: BuildEnv): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ["pkgs/lib/src/styles/index.scss"],
    outfile: "dist/css/coma.min.css",
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
    entryPoints: ["pkgs/app/src/index.tsx"],
    outfile: "dist/js/coma.min.js",
  });
}

export async function buildServer({
  env,
}: BuildEnv): Promise<void | BuildResult> {
  await build({
    ...buildProps({ env }),
    entryPoints: ["pkgs/api/src/index.ts"],
    outfile: "dist/api/express/coma.min.js",
    external: ["express"],
    platform: "node",
    target: "node18.10.0",
  });
}

(async function (options: BuildEnv): Promise<void | BuildResult> {
  await Promise.all([
    buildStyles(options),
    buildApp(options),
    buildServer(options),
  ]);
})({ env: "production" });
