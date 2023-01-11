import React from 'react'
import styled from 'styled-components'
import useStore from '../store/store';

function SideBar() {
  const { status, setStatus } = useStore()
  
  const setView = (st) => { 
    setStatus(st)
  }
  return (
    <Sidebar>
      <ul>
        <li  onClick={()=>setView('char')}>캐릭현황{ status}</li>
        <li onClick={()=>setView('stat')}>통계{status}</li>
        <li></li>
      </ul>
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
    background-color:#15CC79;
    text-align: left;

   ul{
        list-style: none;
        margin :200px 0 0 0;
        li{
            margin : 20px 0 20px 0;
            padding : 10px 0 10px 0;
            a{
                color:${props => props.theme.color};
                text-decoration: none !important;
                font-weight : 600;
               
                &:hover{
                    font-size:1.2rem;
                    color:${props => props.theme.articleHoverCL};
                    border-bottom: 2px solid ${props => props.theme.articleHoverCL};
                }
            
            }
        }
        }
`