module.exports = {
  siteMetadata: {
    title: 'Hala 3 | Kampioensteam uit Tholen 🍺⚽',
    description:
      'Tholense boys 3, een team vol vrienden en gezelligheid. Een familie onderling. Van hoogstaand voetbal hoef je niet uit te gaan, maar gezelligheid staat voorop. HALA 3!',
    url: 'https://www.hala3.nl',
    author: 'Tholense Boys 3',
    intro: 'Laatste nieuws',
    postsPerPage: 12,
    menuLinks: [
      {
        name: 'Hala 3',
        slug: '/',
      },
      {
        name: 'Facebook',
        slug: 'https://www.facebook.com/TholenseBoys3',
        external: true,
      },
    ],
    footerLinks: [
      {
        name: 'Volg ons avontuur ook op Facebook',
        url: 'https://www.facebook.com/TholenseBoys3',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-theme-rotterdam',
      options: {
        // basePath defaults to '/'
        basePath: '/',
        // the path to your icon file
        iconPath: 'static/thb-logo.png',
        // grid defaults to 'basic'
        grid: 'list',
        postsPerPage: 12,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: true,
        pageTransitionDelay: 350,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Hala 3 | Kampioensteam uit Tholen',
        short_name: 'Hala 3',
        start_url: '/',
        background_color: '#141f2d',
        theme_color: '#fbe101',
        display: 'standalone',
        icon: 'static/thb-logo.png',
        crossOrigin: `use-credentials`,
      },
    },
  ],
}
