module.exports = {
  async rewrites() {
    return [
      { source: '/dashboard', destination: '/dashboard/fan-magnets' },
      { source: '/campaigns', destination: '/dashboard/campaigns' },
      { source: '/smart-links', destination: '/dashboard/smart-links' },
      { source: '/fan-magnets', destination: '/dashboard/fan-magnets' },
      { source: '/profile', destination: '/account/profile' },
    ]
  },
  // when typed in url... will redirect
  // async redirects() {
  //   return [
  //     { source: '/dashboard', destination: '/fan-magnets', permanent: true },
  //   ]
  // },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"]
  //   });

  //   return config;
  // },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : '' // production api
  },
};