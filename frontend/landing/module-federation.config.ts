export const mfConfig = {
  name: 'landing',
  filename: 'remoteEntry.js',
  remotes: {
    core: 'core@http://localhost:3000/remoteEntry.js',
  },
  exposes: {
    './LandingPage': './src/pages/Landing',
  },
  shared: ['react', 'react-dom', 'antd', 'zustand'],
};
