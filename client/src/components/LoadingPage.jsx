import React from 'react'
import styled from 'styled-components'
import Paimon from '../assets/Paimon.png'


function LoadingPage() {
 
  return (
    <Loadingpage>
     
      <div>

      <Spinner src={Paimon} alt="" />
      <h2>Loading...</h2>
    <h1>not sure about "save", but tech otaku can change the world certainly</h1>
      </div>
    </Loadingpage>
  )
}

export default LoadingPage

const Loadingpage = styled.div`
  height:100vh;
  width:100vw;
  position:relative;
  top:0;
  background-color:#000228;
  z-index:5;
  h1,h2{
    color:white;
  }
  div{
    position:relative;
    top : 30%;
  }
  
`
const Spinner = styled.img`
  clip-path: circle(50% at 50% 50%);
  @keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
animation: rotate 5s infinite;
`