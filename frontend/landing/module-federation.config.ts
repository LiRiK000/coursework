export const mfConfig = {
  name: 'landing',
  filename: 'remoteEntry.js',
  exposes: {
    './LandingPage': './src/pages/Landing',
  },
  shared: ['react', 'react-dom'],
};
