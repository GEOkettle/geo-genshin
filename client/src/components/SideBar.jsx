import React from 'react'
import styled from 'styled-components'
import useStore from '../store/store.jsx';

function SideBar() {
  const { status, setStatus,setCurrentElement,currentElement } = useStore()
  
  const setView = (st) => { 
    setStatus(st)
    setCurrentElement('none')
  }
  return (
    <Sidebar style={{backgroundColor:currentElement==='none'?"rgba(0,0,0,0.7)":"rgba(0,0,0,0.1)"}}>
      <ul>
        <li onClick={()=>setView('char')}>캐릭현황</li>
        <li onClick={()=>setView('stat')}>통계</li>
        <li></li>
      </ul>
      <h2>개발중인 toyprojcet입니다. 디자인 및 개발참여에 관심있으시면 jsonmiou @gmail.com으로 연락바랍니다. </h2>
      <h2>웹사이트내 이미지,스탯등의 모든자료의 저작권은 <a href="https://www.hoyoverse.com/ko-kr">호요버스</a>에 있습니다. </h2>
    </Sidebar>
  )
}

export default SideBar


const Sidebar = styled.div`
    height: 100%;
    width:10%;
    position: fixed;
    bottom: 0;
    left: 0;
    font-family: 'Jua', sans-serif; 
    color:white;
    text-align: left;
    border-top-right-radius:30px;
    border-bottom-right-radius:30px;

   ul{
        list-style: none;
        margin :200px 0 0 0;
        li{
            margin : 20px 0 20px 0;
            padding : 10px 0 10px 0;
            font-size:1.2rem;
            &:hover{
                font-size:1.5rem;
            }
            a{
                color:${props => props.theme.color};
                text-decoration: none !important;
                font-weight : 600;
            }
        }
        }
`