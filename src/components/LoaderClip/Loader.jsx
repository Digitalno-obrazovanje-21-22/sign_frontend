import { useState } from 'react'
import { css } from '@emotion/react'
import RingLoader from 'react-spinners/RingLoader'

const Loader = ({guessing}) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: #0D6EFD;
  `
  let [color, setColor] = useState('#0D6EFD')

  return (
    <RingLoader speedMultiplier={1} color={color} loading={guessing} css={override} size={150} />
  )

}
export default Loader;