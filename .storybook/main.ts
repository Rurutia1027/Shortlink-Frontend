import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  // Configure webpack to handle CSS modules and path aliases
  webpackFinal: async (config) => {
    // Handle path aliases (same as Next.js tsconfig.json)
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '..'),
        '@/src': path.resolve(__dirname, '../src'),
        '@/app': path.resolve(__dirname, '../app'),
      }
    }

    // CSS Modules support is already handled by @storybook/nextjs
    // But we ensure CSS files are processed correctly
    const rules = config.module?.rules || []
    const cssRule = rules.find((rule: any) => 
      rule.test && rule.test.toString().includes('css')
    )

    return config
  },
}

export default config
