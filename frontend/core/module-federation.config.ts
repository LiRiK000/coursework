export const mfConfig = {
  name: 'core',
  filename: 'remoteEntry.js',
  remotes: {
    landing: 'landing@http://localhost:3001/remoteEntry.js',
  },
  exposes: {
    './widgets/Menu': './src/widgets/Menu',
  },
  shared: ['react', 'react-dom', 'antd', 'zustand'],
};
