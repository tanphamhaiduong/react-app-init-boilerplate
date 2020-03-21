const spawn = require('child_process').spawnSync
const path = require('path')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const {
  addWebpackResolve,
  override,
  useEslintRc,
  addBundleVisualizer,
  watchAll,
  overrideDevServer,
  enableEslintTypescript,
} = require('customize-cra')

const findWebpackPlugin = (plugins, pluginName) => plugins.find(plugin => plugin.constructor.name === pluginName)

const overrideProcessEnv = value => config => {
  const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin')
  const processEnv = plugin.definitions['process.env'] || {}
  const isDevelopment = process.env.NODE_ENV === 'development'
  plugin.definitions['process.env'] = {
    APP_VERSION: isDevelopment ? JSON.stringify('DEV') : JSON.stringify(getAppVersion()),
    ...processEnv,
    ...value,
  }

  return config
}

// Helper function to run a system command and get the stdout
// Raises the stdout if there is an error
function runCommand(cmd, args) {
  const resultObj = spawn(cmd, args)
  const { stdout, stderr } = resultObj

  if (stderr.length !== 0) {
    throw new Error(stderr.toString().trim())
  }

  return stdout.toString().trim()
}

function getRef() {
  return runCommand('git', ['rev-parse', '--short', 'HEAD'])
}

function getHashOfCommitTagged() {
  return runCommand('git', ['rev-list', '--tags', '--max-count=1'])
}

const getAppVersion = () => {
  try {
    const tag = runCommand('git', ['describe', '--tags', getHashOfCommitTagged()])
    return tag
  } catch (e) {
    return getRef()
  }
}

module.exports = {
  webpack: override(
    addWebpackResolve({
      alias: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-router': 'react-router',
        'react-router-dom': 'react-router-dom',
        src: path.resolve(__dirname, 'src'),
      },
    }),
    useEslintRc(),
    enableEslintTypescript(),
    process.env.REACT_APP_BUNDLE_VISUALIZER == 1 && addBundleVisualizer(),
    rewireReactHotLoader,
    overrideProcessEnv(),
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll(),
  ),
  jest: function(config) {
    const newConfig = {
      ...config,
      snapshotSerializers: ['enzyme-to-json/serializer'],
      coverageThreshold: {
        global: {
          branches: 40,
          functions: 40,
          lines: 40,
          statements: 40,
        },
      },
      coveragePathIgnorePatterns: [
        '.*\\.d\\.ts',
        'serviceWorker',
        '<rootDir>/src/__mocks__',
        '<rootDir>/src/index.tsx',
        'index.ts',
      ],
    }
    return newConfig
  },
  paths: function(paths) {
    return paths
  },
}
