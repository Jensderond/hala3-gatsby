module.exports = {
  siteMetadata: {
    title: 'Hala 3 | Kampioensteam uit Tholen 🍺⚽',
    description:
      'Tholense boys 3, een team vol vrienden en gezelligheid. Een familie onderling. Van hoogstaand voetbal hoef je niet uit te gaan, maar gezelligheid staat voorop. HALA 3!',
    url: 'https://gatsby-starter-amsterdam.netlify.com',
    author: 'Tholense Boys 3',
    intro: 'Laatste nieuws 🍺⚽',
    menuLinks: [
      {
        name: 'Hala 3',
        slug: '/',
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
      resolve: 'gatsby-theme-amsterdam',
      options: {
        // basePath defaults to '/'
        basePath: '/',
        // the path to your icon file
        // iconPath: 'src/images/favicon.png',
        // grid defaults to 'basic'
        grid: 'list',
      },
    },
  ],
}
