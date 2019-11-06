import React from 'react'
import styled from 'styled-components'
import emojiFont from '../images/emoji-font.png'

const Wrapper = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  height: 32px;
  width: 32px;
  vertical-align: middle;
  background-image: url(${emojiFont});
  background-size: cover;
`

const beerStyle = {
  backgroundPosition: '57% 0',
}

const soccerStyle = {
  backgroundPosition: '-14.28571% 0',
}

const Emoji = props => {
  return (
    <>
      {props.type === 'beer' && <Wrapper style={beerStyle} />}
      {props.type === 'soccer' && <Wrapper style={soccerStyle} />}
      {props.type !== 'soccer' && props.type !== 'beer' && (
        <Wrapper style={beerStyle} />
      )}
    </>
  )
}

export default Emoji
