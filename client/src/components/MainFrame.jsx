import React from 'react'
import styled from 'styled-components'
import Characters from './Characters'
import Statistics from './Statistics'
import useStore from '../store/store'
import wallpaper from '../assets/wallpaper.jpg'
const viewPage = {
  char: <Characters />,
  stat:<Statistics/>
}

function MainFrame() {
  const {status} = useStore()
  return (
    
    <Mainframe >
      { viewPage[status]}
    </Mainframe>
  )
}

export default MainFrame

const Mainframe = styled.div`
  overflow-y:scroll;
    height: 100%;
    width:90%;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color:#2A2A2A;
    /* background-color: ; */
`