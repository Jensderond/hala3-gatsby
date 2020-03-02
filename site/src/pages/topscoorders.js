import React from 'react'
import Container from 'gatsby-theme-rotterdam/src/components/Container'
import Content from 'gatsby-theme-rotterdam/src/components/Content'
import SEO from 'gatsby-theme-rotterdam/src/components/SEO'
import {
  topScorer1920 as topScorer1920Unfiltered,
  gamesPlayed1920,
} from '../data/matchData'

const TopScorersPage = () => {
  const topScorer1920 = topScorer1920Unfiltered.sort(
    (a, b) => b.goals - a.goals
  )
  return (
    <Container>
      <SEO
        title="Topscoorders Hala 3"
        description="Wat je nog niet wist over Hala 3"
      />
      <Content>
        <h1>Topscoorders Hala 3</h1>
        <p>Hieronder de kort en bondige statistieken van onze mannen!</p>
        <span>Let op: deze statistieken zijn verre van actueel.</span> 
        <h3>
          <strong>Topscoorders 2019-2020</strong>
        </h3>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Naam</strong>
              </th>
              <th align="left">
                <strong>Aantal Goals</strong>
              </th>
              {/* <th align="left">Aantal Assists</th> */}
              <th align="left">
                <strong>Aantal Bier</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {topScorer1920.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.goals}</td>
                {/* <td>{item.assists}</td> */}
                <td>
                  {Math.ceil(
                    7 * gamesPlayed1920.won * item.beerRatio +
                      4 * gamesPlayed1920.lost * item.beerRatio
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Container>
  )
}

export default TopScorersPage
