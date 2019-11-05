import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query siteMetaDataTheme {
        site {
          siteMetadata {
            title
            description
            intro
            author
            menuLinks {
              name
              slug
              external
            }
            footerLinks {
              name
              url
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}
