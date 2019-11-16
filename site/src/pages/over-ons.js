import React from 'react'
import styled from 'styled-components'
import Container from 'gatsby-theme-rotterdam/src/components/Container'
import Content from 'gatsby-theme-rotterdam/src/components/Content'
import SEO from 'gatsby-theme-rotterdam/src/components/SEO'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const Copyright = styled.p`
  text-align: right;
  font-size: 0.8em !important;
  color: ${props => props.theme.colors.secondary};
`

const AboutPage = ({ data }) => {
  return (
    <Container>
      <SEO title="Over Hala 3" description="Wat je nog niet wist over Hala 3" />
      <Content>
        <h1>Over Hala 3</h1>
        <p>
          <strong>Tholense Boys 3, ook wel bekend als Hala 3</strong>, een team
          vol vrienden en gezelligheid. Een familie onderling. Van hoogstaand
          voetbal hoef je niet uit te gaan, maar gezelligheid staat voorop. HALA
          3!
        </p>

        <Img
          sizes={{
            ...data.file.childImageSharp.fluid,
            aspectRatio: 5 / 3,
          }}
          alt=""
          title=""
        />
        <Copyright>&copy; Tonny Bogers</Copyright>
      </Content>
    </Container>
  )
}

export default AboutPage

export const query = graphql`
  query {
    file(relativePath: { eq: "images/DE935931-F7B7-4F4E-AF10-1F59B2491BE4.jpeg" }) {
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
`
