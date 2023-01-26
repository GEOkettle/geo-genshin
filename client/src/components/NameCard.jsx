import React, { useEffect } from 'react'
import styled from 'styled-components'
import useStore from '../store/store'
function NameCard() {
  const { characters,userInfo,stats } = useStore()
  const traveler = characters.find(c => c.name === "여행자");

  let chestNumber =  stats.stats ? stats.stats.common_chest_number + stats.stats.exquisite_chest_number + stats.stats.luxurious_chest_number + stats.stats.precious_chest_number + stats.stats.magic_chest_number : 0;
  let culusNumber =  stats.stats ? stats.stats.anemoculus_number + stats.stats.dendroculus_number + stats.stats.electroculus_number + stats.stats.geoculus_number : 0 ;

  return (
     <Namecard>
      <div className='title'>여행자님께선 지금까지 티바트에 총<span style={{ color: 'red'}}> {stats.stats ? stats.stats.active_day_number :0}</span>번 방문하셨습니다.</div>
        <div className='user'>
          <CircleImg src={traveler ?traveler.icon : ''} alt="" />
          <h4 style={{ margin: '5px 0 0 0' }}>{userInfo.game_role_id}</h4>
          <table style={{ width: '100%'}}>
              <colgroup>
              <col width="30%"/>
              <col width="70%" />
              </colgroup>
            <tbody>
              
            <tr>
              <td>&#8226; 닉네임</td>
              <td>{ userInfo.nickname}</td>
            </tr>
            <tr>
              <td>&#8226; 레벨</td>
              <td>{ userInfo.level}</td>
            </tr>
            <tr>
              <td>&#8226; 서버</td>
              <td>{ userInfo.region_name}</td>
            </tr>
            <tr>
              <td>&#8226; 나선비경</td>
              <td>{userInfo.data? userInfo.data[3].value :''}층</td>
            </tr>
            </tbody>
          </table>
        </div>
      <div className='stat'>
        <table style={{ width: '50%'}}>
          <colgroup>
          <col width="50%"/>
          </colgroup>
          <tbody>
            <tr>
              <td>&#8226; 업적 달성 개수</td>
              <td>{stats.stats ? stats.stats.achievement_number:0}개</td>
            </tr>
            <tr>
              <td>&#8226; 획득한 캐릭터 개수</td>
              <td>{stats.stats ? stats.stats.avatar_number: 0}명</td>
            </tr>
            <tr>
              <td>&#8226; 개방한 비경 개수</td>
              <td>{stats.stats ? stats.stats.domain_number : 0}개</td>
            </tr>
          </tbody>
        </table>
        <table  style={{ width: '50%'}}>
          <colgroup>
          <col width="50%"/>
          <col width="50%"/>
          </colgroup>
          <tbody>
            <tr>
              <td>&#8226; 획득한 신의 눈동자 개수</td>
              <td>{culusNumber}</td>
            </tr>
            <tr>
              <td>&#8226; 열어본 보물상자 개수</td>
              <td>{chestNumber}개</td>
            </tr>
            <tr>
              <td>&#8226; 워프포인트 활성화</td>
              <td>{stats.stats ? stats.stats.way_point_number : 0}개</td>
            </tr>
          </tbody>
        </table>
        </div>
      </Namecard>
  )
}

export default NameCard

const CircleImg = styled.img`
  width : 90px;
  height : 90px;
  clip-path: circle(50% at 50% 50%);
  background-color : black;
  margin-top:20px;
  margin-left: auto;
  margin-right: auto;
  display: table;
  table{
    border: 1px solid red;
  }
`
const Namecard = styled.div`


  height:40%;
  width:100%;
  background-color:rgba(0,0,0,0.7);
  color:white;
  border-radius:15px;
  margin-top: 20px;
  padding: 20px;
  display:grid;
  grid-template-areas:
  'header header header header header header header header header'
  'menu main main main main main main main main';
  gap:15px;
  div::-webkit-scrollbar{display:none;}
  div{
    border:2px solid white;
    border-radius:15px;
    text-align: center;

    overflow:scroll
    }
  .title{grid-area:header;height:60px; font-size:2.5rem;  }
  .user{grid-area:menu; height:250px;  }
  .stat{grid-area:main;height:250px; display:flex; flex-direction:row; table{font-size:1.2rem;}  }
`

