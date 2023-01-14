import React from 'react'
import { useState,useEffect } from 'react'
import useStore from '../store/store.jsx'
import styled from 'styled-components'
import NameCard from './NameCard.jsx'


function CharacterCard() { 
  const { characters, setCharacters,setStatus,setSpecificChar,setCurrentElement } = useStore()
  const [sorting,setSorting] = useState('')
  let charObj;
  charObj = characters;
  const pickColor = (color) => {
    let bgc;
    switch (color) { 
      case 'Geo': bgc = ' rgb(219, 168, 1)'
        break;
      case 'Cryo': bgc = '#72BCCC '
        break;
      case 'Pyro': bgc = ' #FF6C6C'
        break;
      case 'Hydro': bgc = ' #3F80E8 '
        break;
      case 'Electro': bgc = ' #8A3EAB '
        break;
      case 'Anemo': bgc = ' #00BFA5 '
        break;
      case 'Dendro': bgc = ' rgb(0, 128, 0) '
        break;
    }
    return bgc;
  }
  const goldEffect = (r) => { 
    let bl
    switch (r) { 
      case 4: bl = "";
        break;
      case 5: bl = "0 0 4px 4px";
        break;
      case 105: bl = "0 0 6px 5px 	#0ba7ca";
        break;
    }
    return bl;
  }
  const getSorting = (e) => { 
    setSorting(e.target.value)
  }


  useEffect(() => { 

    bySort(sorting)
  },[sorting])
  const bySort = (n) => {
    switch (n) { 
      case 'fetter':
        charObj = charObj.sort(function (a, b) {
          return b.fetter - a.fetter ;
        })
        setCharacters(charObj)
        break;
      case 'level':
        charObj = charObj.sort(function (a, b) {
          return  b.level - a.level ;
        })
        setCharacters(charObj)
        break;
      case 'constellation':
        charObj = charObj.sort(function (a, b) {
          return  b.actived_constellation_num - a.actived_constellation_num;
        })
        setCharacters(charObj)
        break;
      case 'rarity':
        charObj = charObj.sort(function (a, b) {
          return  b.rarity - a.rarity;
        })
        setCharacters(charObj)
        break;
    }
    
  }
  const reverseSorting = () => { 
    charObj = charObj.reverse(charObj)
    setCharacters(charObj)
  }
  const setView = (st,ch) => { 
    setStatus(st)
    setSpecificChar(ch)
    setCurrentElement(ch.element)
  }
  

  return (
    <CharacterPannel>
      <NameCard/>
      <div>

        <h1 style={{ color: "white" }}>캐릭터 보유 현황</h1>
        <div>

        <StyledSelect onChange={(e) => getSorting(e)} value={sorting}>
          <option value="" disabled>===========================▽</option>
          <option value="constellation">돌파순</option>
          <option value="fetter">호감도순</option>
          <option value="level">레벨순</option>
          <option value="rarity">등급순</option>
          {/* <option value="name">이름순</option> */}
          </StyledSelect>
          {/* <img src={ sortingLogo } alt="" /> */}
          <button onClick={() => { reverseSorting()}}>↑↓</button>
        </div>
      </div>
      <br />
      {charObj.map(ch => (
        <div onClick={()=>setView('spch',ch)}  key={ ch.name}>

        <Card style={{ background:ch.rarity===4 ? "rgba(0,0,0,0.6)":"#9e7e1367",color: pickColor(ch.element),border:ch.rarity===4?"2px solid"+ pickColor(ch.element):"1px solid"+ pickColor(ch.element), boxShadow:ch.rarity===4 ? "" :goldEffect(ch.rarity)+pickColor(ch.element)}} >
          <div style={{height:"30px" }}>
              <Constellation style={{ border: '2px solid' + pickColor(ch.element) }}>{ch.actived_constellation_num}</Constellation>
            <Level>Lv.{ch.level}</Level>
          </div>
          <img  src={ch.image} alt="" />
            <div style={{fontWeight:"900",position:"relative",bottom:"40px"}}>{ch.name}</div>
        </Card>
        </div>
      ))}
    </CharacterPannel>
  )
}

function Characters() {
 
  return (
    <div>
      <CharacterCard/>
    </div>
  )
}
export default Characters

const CharacterPannel = styled.div`
  width:100%;
  height:100%;
  font-family: 'Jua', sans-serif; 
  
  display:flex;
  flex-wrap : wrap;
  justify-content:center;
`
const Card = styled.div`
  width:130px;
  height:150px;
  margin:15px 0 0 15px;
  /* border: px solid white; */
  border-radius:5px;
  /* clip-path: circle(50% at 50% 50%); */

  img{
    position: relative;
    width: calc(100% - 60px);
    bottom: 20px;
    /* left: 1px; */
  }
  &:hover{
    transform: scale(1.1);
    cursor: pointer;
  }
`

const Constellation =styled.div`
  position:relative;
  top: 3px;
  left:3px;
  width:20px;
  height:20px;
  font-weight:600;
  border-radius:50%;
`
const Level =styled.div`
  position:relative;
  left:67%;
  width:20px;
  bottom:20px;
  height:20px;

  font-weight:600;

`
const StyledSelect = styled.select`
  font-family: 'Jua', sans-serif; 
    width:250px;
    height:50px;
    background-color: rgba(255,255,255,0.2);
    color:white;
    border:1px solid white;
    border-radius:5px;
    -webkit-appearance: none;
    outline:none;
    text-align:center;

  option{
    background-color:rgba(0,0,0,0.6);
    outline:none;
    border-radius:50%;
    /* font-size:1.2rem; */
  }
`
