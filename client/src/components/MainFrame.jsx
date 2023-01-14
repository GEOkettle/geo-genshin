import React, { useEffect,useState,useRef } from 'react'
import styled from 'styled-components'
import Characters from './Characters.jsx'
import Statistics from './Statistics.jsx'
import  CharacterInfo from './CharacterInfo.jsx'
import useStore from '../store/store.jsx'


const viewPage = {
  char: <Characters />,
  stat: <Statistics />,
  spch:<CharacterInfo/>
}
const useMove = () => {
  const [state, setState] = useState({x: 0, y: 0})

  const handleMouseMove = e => {

    setState(state => ({ ...state, x: e.clientX, y: e.clientY }))
  
  }
  return {
    mouseX: state.x,
    mouseY: state.y,
    handleMouseMove,
  }
}

function MainFrame() {
  const { status, userInfo, characters } = useStore()
  const {mouseX, mouseY, handleMouseMove} = useMove()

  return (
    
    <Mainframe className='mainFrame' onMouseMove={handleMouseMove}>

     
      { viewPage[status]}
    </Mainframe>
  )
}

export default MainFrame

const Mainframe = styled.div`
  overflow-y:scroll;
    height: 100%;
    width:70%;
     position:absolute;

    bottom: 0;
    right: 10%;

    /* background-color:black; */
`

