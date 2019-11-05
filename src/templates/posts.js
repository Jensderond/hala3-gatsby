import React from 'react'
import { graphql } from 'gatsby'
import Intro from '../gatsby-theme-amsterdam/components/Intro'
import PostList from '../gatsby-theme-amsterdam/components/PostList'
import Emoji from '../gatsby-theme-amsterdam/components/Emoji'
import SEO from 'gatsby-theme-amsterdam/src/components/SEO'
import Pagination from 'gatsby-theme-amsterdam/src/components/Pagination'
import Container from 'gatsby-theme-amsterdam/src/components/Container'
import { useSiteMetadata } from 'gatsby-theme-amsterdam/src/hooks/use-site-metadata'

const PostsPage = ({ data, pageContext }) => {
  const { intro } = useSiteMetadata()
  const posts = data.allMarkdownRemark.edges

  let ogImage
  try {
    ogImage = posts[0].node.frontmatter.cover.childImageSharp.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <>
      <SEO title="Home" image={ogImage} />
      <Container fullWidth noPadding>
        {intro && (
          <Intro text={intro} context={pageContext}>
            <Emoji type="beer" />
            <Emoji type="soccer" />
          </Intro>
        )}
        {posts.length > 0 && <PostList posts={posts} context={pageContext} />}
      </Container>
      <Pagination context={pageContext} />
    </>
  )
}

export default PostsPage

export const postsQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            tags
            description
            date(formatString: "DD MMMM YYYY")
            cover {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                ogimg: resize(width: 1000) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
