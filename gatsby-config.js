module.exports = {
  siteMetadata: {
    title: 'Hala 3 | Kampioensteam uit Tholen 🍺⚽',
    description:
      'Tholense boys 3, een team vol vrienden en gezelligheid. Een familie onderling. Van hoogstaand voetbal hoef je niet uit te gaan, maar gezelligheid staat voorop. HALA 3!',
    url: 'https://www.hala3.nl',
    author: 'Tholense Boys 3',
    intro: 'Laatste nieuws 🍺⚽',
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
    'gatsby-plugin-no-sourcemaps',
    {
      resolve: 'gatsby-theme-amsterdam',
      options: {
        // basePath defaults to '/'
        basePath: '/',
        // the path to your icon file
        iconPath: 'static/thb-logo.png',
        // grid defaults to 'basic'
        grid: 'list',
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
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        icon: 'static/thb-logo.png', // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
