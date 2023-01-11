import React from 'react'
import { useState,useEffect } from 'react'
import useStore from '../store/store'
import styled from 'styled-components'
import sortingLogo from '../assets/sortingLogo.svg'

function CharacterCard() { 
  const { characters, setCharacters } = useStore()
  const [sorting,setSorting] = useState('')
  console.log(characters)
  let charObj;
  charObj = characters;
  const pickColor = (color) => {
    let bgc;
    switch (color) { 
      case 'Geo': bgc = '-webkit-radial-gradient(circle, white, rgb(219, 168, 1,0.8) )'
        break;
      case 'Cryo': bgc = '-webkit-radial-gradient(circle, white,#72BCCC )'
        break;
      case 'Pyro': bgc = '-webkit-radial-gradient(circle, white, #FF6C6C )'
        break;
      case 'Hydro': bgc = '-webkit-radial-gradient(circle, white, #3F80E8 )'
        break;
      case 'Electro': bgc = '-webkit-radial-gradient(circle, white, #8A3EAB )'
        break;
      case 'Anemo': bgc = '-webkit-radial-gradient(circle, white, #00BFA5 )'
        break;
      case 'Dendro': bgc = '-webkit-radial-gradient(circle, white, rgb(0, 128, 0) )'
        break;
    }
    return bgc;
  }
  const goldEffect = (r) => { 
    let bl
    switch (r) { 
      case 4: bl = "";
        break;
      case 5: bl = "0 0 6px 5px 	#D1B000";
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

  

  return (
    <CharacterPannel>
      <div>

        <h1 style={{ color: "white" }}>캐릭터 보유 현황</h1>
        <div>

        <select onChange={(e) => getSorting(e)} value={sorting}>
          <option value="constellation">돌파순</option>
          <option value="fetter">호감도순</option>
          <option value="level">레벨순</option>
          <option value="rarity">등급순</option>
          {/* <option value="name">이름순</option> */}
          </select>
          {/* <img src={ sortingLogo } alt="" /> */}
          <button onClick={() => { reverseSorting()}}>↑↓</button>
        </div>
      </div>
      <br />
      {charObj.map(ch => (
        <Card style={{ background: pickColor(ch.element), boxShadow: goldEffect(ch.rarity) }} key={ ch.name}>
          <div style={{height:"30px" }}>
            <Constellation>{ch.actived_constellation_num}</Constellation>
            <Level>Lv.{ch.level}</Level>
          </div>
          <img  src={ch.image} alt="" />
            <div style={{color:'black',fontWeight:"900",position:"relative",bottom:"55px"}}>{ch.name}</div>
        </Card>
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
  
  display:flex;
  flex-wrap : wrap;
  justify-content:center;
`
const Card= styled.div`
  width:150px;
  height:180px;
  margin:15px 0 0 15px;
  border-radius:5px;
  /* clip-path: circle(50% at 50% 50%); */

  img{
    position: relative;
    width: calc(100% - 60px);
    bottom: 20px;
    /* left: 1px; */
  }
`

const Constellation =styled.div`
  position:relative;
  top: 2px;
  left:2px;
  width:20px;
  height:20px;
  border: 2px solid black;
  color:black;
  font-weight:600;
  border-radius:50%;
`
const Level =styled.div`
  position:relative;
  left:73%;
  width:20px;
  bottom:20px;
  height:20px;
  color:black;
  font-weight:600;

`