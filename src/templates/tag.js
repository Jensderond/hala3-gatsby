import React from 'react'
import { graphql } from 'gatsby'
import Intro from 'gatsby-theme-amsterdam/src/components/Intro'
import PostList from 'gatsby-theme-amsterdam/src/components/PostList'
import SEO from 'gatsby-theme-amsterdam/src/components/SEO'
import Pagination from 'gatsby-theme-amsterdam/src/components/Pagination'
import Container from 'gatsby-theme-amsterdam/src/components/Container'

const TagPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  let ogImage
  try {
    ogImage = posts[0].node.frontmatter.cover.childImageSharp.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <>
      <SEO title={`Tag: ${pageContext.tag}`} image={ogImage} />
      <Container fullWidth noPadding>
        <Intro
          text={`Tagged: ${pageContext.tag}`}
          context={pageContext}
          capitalize
        />
        {posts.length > 0 && <PostList posts={posts} context={pageContext} />}
      </Container>
      <Pagination context={pageContext} />
    </>
  )
}

export default TagPage

export const tagQuery = graphql`
  query($skip: Int!, $limit: Int!, $tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            date(formatString: "MMMM DD, YYYY")
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
