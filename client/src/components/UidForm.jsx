import React, { useState} from 'react'
import styled from 'styled-components'
import useStore from '../store/store'
function UidForm() {
  const { userId, setUserId } = useStore()
  const [typedId,setTypedId] =useState()
  const setUid = (e) => { 
    // setUserId(id)
    e.preventDefault()
    console.log(e.target.value)
    console.log(typedId)
    setUserId(typedId)
  }
  return (
    <Uidform>
      <form action="">

      <input type="number" onChange={(e)=>setTypedId(e.target.value)} placeholder="165181087" />
      <button type='submit' onClick={(e)=>setUid(e)}>제출</button>
      </form>
    </Uidform>
  )
}

export default UidForm

const Uidform = styled.div`
  height:100vh;
  width:100vw;
  position:relative;
  top:0;
  z-index:6;
  background-color:black;
`