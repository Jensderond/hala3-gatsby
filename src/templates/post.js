import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import Container from 'gatsby-theme-amsterdam/src/components/Container'
import Hero from 'gatsby-theme-amsterdam/src/components/Hero'
import Content from '../gatsby-theme-amsterdam/components/Content'
import Preview from '../gatsby-theme-amsterdam/components/Preview'
import SEO from 'gatsby-theme-amsterdam/src/components/SEO'
import ProgressIndicator from 'gatsby-theme-amsterdam/src/components/ProgressIndicator'
import OptionsContext from 'gatsby-theme-amsterdam/src/components/OptionsContext'

const PostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const next = pageContext.previous
  const previous = pageContext.next
  const options = useContext(OptionsContext)

  let ogImage
  try {
    ogImage = post.frontmatter.cover.childImageSharp.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={ogImage}
      />
      {options.progressIndicator && <ProgressIndicator />}
      <Container fullWidth>
        <Hero
          title={post.frontmatter.title}
          image={post.frontmatter.cover}
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          context={pageContext}
        />
        <Content html={post.html} />
        <Preview previous={previous} next={next} context={pageContext} />
      </Container>
    </>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query BloggPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
`
