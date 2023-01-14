import React from 'react'
import useStore from '../store/store'

function CharacterInfo() {
  const { specificChar } =useStore()
  return (
    <div style={{ backgroundColor: "transparent", color: "yellow", fontSize: "3rem" }}>{ JSON.stringify(specificChar)}</div>
  )
}

export default CharacterInfo