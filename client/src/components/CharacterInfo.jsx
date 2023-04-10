import React, { useState,useEffect} from 'react'
import useStore from '../store/store'
import styled from 'styled-components'
import { twoArtiMatch, twoTwosetOrFourset, onlyTwoTwoSet, allInOne } from '../functions/Functions'

const colorSet = {
  Pyro: "#c523235a",
  Geo: "#58470f75",
  Electro: "#3e07557d",
  Cryo: '#1c92ada6',
  Hydro: ' #1a4fa581 ',
  Anemo: ' #08746678 ',
  Dendro:' #096e0954 '
}
const Element = {
  Pyro: "불",
  Geo: "바위",
  Electro:"번개",
  Cryo: "얼음",
  Hydro: "물",
  Anemo: "바람",
  Dendro:"풀"

}
const barColor = {
  Pyro: "#FF6C6C",
  Geo: "rgb(219, 168, 1)",
  Electro:"#8A3EAB",
  Cryo: "#72BCCC",
  Hydro: "#3F80E8",
  Anemo: "#00BFA5",
  Dendro:"rgb(0, 128, 0)"

}
function CharacterInfo() {

const { specificChar,setSpecificChar,weaponDetail,setWeaponDetail,userId } = useStore()
const [settingCheck, setSettingCheck] = useState(['5개의 성유물을 모두장착해야 세트검사가 가능합니다.', '세트효과 적용을 받고있지 않습니다.']);
const artiObject = specificChar.reliquaries;  
const weaponName = specificChar.weapon.name

  
//dev
const getWeaponDetail = async () => {
const res = await fetch(
"http://localhost:5000/weapon", {
mode: 'cors',credentials:'include',
method: 'POST',
headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',    'Access-Control-Allow-Origin':'http://localhost:5000'},
body: JSON.stringify({ uid: userId,weaponName:weaponName })
}).then(res => {  return res.json() })
  .then((res) => {
    console.log(JSON.parse(res.weaponDetail.modules[0].components[0].data).list)
    setWeaponDetail(JSON.parse(res.weaponDetail.modules[0].components[0].data).list)
  })
}
//prod
// const getWeaponDetail = async () => {
// const res = await fetch(
// "http://3.144.80.94:5000/weapon", {
// mode: 'cors',credentials:'include',
  
  
// method: 'POST',
// headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',    'Access-Control-Allow-Origin':'http://3.144.80.94'},
// body: JSON.stringify({ uid: userId,weaponName:weaponName })
// }).then(res => {  return res.json() })
//   .then((res) => {
//     console.log(JSON.parse(res.weaponDetail.modules[0].components[0].data).list)
//     setWeaponDetail(JSON.parse(res.weaponDetail.modules[0].components[0].data).list)
//   })
// }


useEffect(() => {
getWeaponDetail();
let setCheck = []
if (artiObject.length === 5) { 
  artiObject.map(idx => { 
  setCheck = [...setCheck,idx.set.id]
})
  
//4셋 :1,2 2셋2: 3,2 2셋1 :4 노셋 :5 (두가지경우) 
const set = new Set(setCheck)
const newArr = [...set];
let OBJ;      
const newSettingCheck =[...settingCheck];
const artiInfoAnalyze = (obj) => { 
  newSettingCheck[0] = obj.number;
  newSettingCheck[1] = obj.effect;
  setSettingCheck(newSettingCheck)
}
switch (newArr.length) {
  case 5:
    newSettingCheck[0] ='현재 적용중인 성유물 세트가 없습니다.'
    setSettingCheck(newSettingCheck)
    break;
  case 4:
    OBJ = twoArtiMatch(setCheck, newArr, artiObject);
    artiInfoAnalyze(OBJ)
    break;
  case 3:
    OBJ = onlyTwoTwoSet(setCheck, newArr, artiObject)
    artiInfoAnalyze(OBJ)
    break;
  case 2:
    OBJ = twoTwosetOrFourset(setCheck, newArr, artiObject);
    artiInfoAnalyze(OBJ)
    break;
    case 1:
    OBJ = allInOne(artiObject);
    artiInfoAnalyze(OBJ)
    break;
    }
    }
   },[])
  return (
    <div style={{ width: '100%', height: '100%'}}>
      <Charcard barColor={ barColor[specificChar.element]} style={{ backgroundColor: colorSet[specificChar.element] }}>
        
        <div className="img char">
          <img src={specificChar.icon} alt="" />
          <hr />
    
            <table style={{width:"100%",fontSize:"1.4rem",}}>
              <colgroup>
              <col width="30%"/>
              <col width="70%"/>
              </colgroup>
              <tbody>
                <tr>
                  <td style={{color:"grey"}}>이름</td>
                <td>{specificChar.name}</td>
                </tr>
                <tr>
                  <td style={{color:"grey"}}>원소</td>
                  <td>{Element[specificChar.element]}</td>
                </tr>
                <tr>
                  <td style={{color:"grey"}}>등급</td>
                  <td>{specificChar.rarity}성</td>
                </tr>
                <tr>
                  <td style={{color:"grey"}}>무기종류</td>
                  <td>{specificChar.weapon.type_name}</td>
                </tr>
              </tbody>
            </table>
        </div>

        <div className="stat char">
              <table style={{width:"100%",fontSize:"1.4rem",}}>
              <colgroup>
              <col width="23%"/>
              <col width="77%"/>
              </colgroup>
              <tbody>
                <tr>
                <td >LV.{specificChar.level}</td>
                <td><progress id="file" value={specificChar.level} max="90"/>&nbsp;{specificChar.level}/90</td>
                </tr>
                <tr>
                <td >무기LV.{specificChar.weapon.level}</td>
                  <td><progress id="file" value={specificChar.weapon.level} max="90"/>&nbsp;{specificChar.weapon.level}/90</td>
                </tr>
                <tr>
                <td>별자리LV.{specificChar.actived_constellation_num}</td>
                <td><progress id="file" value={ specificChar.actived_constellation_num} max="6"/>&nbsp;{ specificChar.actived_constellation_num}/6</td>
                </tr>
                <tr>
                <td >호감도LV.{ specificChar.fetter}</td>
                <td><progress id="file" value={specificChar.fetter} max="10"/>&nbsp;{specificChar.fetter}/10</td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className="weapon char">
         
          <div style={{marginTop:"10px"}} >
          <img src={specificChar.weapon.icon} alt="" />
            <div style={{ fontSize: "2.5rem"}}>{specificChar.weapon.name}</div>
          </div>

          <div style={{marginTop:"10px",marginLeft:"-50px"}} >
          <div style={{width:"100px"}}>등급</div>
          <div>{specificChar.weapon.rarity}성</div>
          </div>

          <div  style={{marginTop:"10px",marginLeft:"-50px"}} >
          <div style={{width:"80px"}}>재련</div>
          <div>{specificChar.weapon.affix_level}</div>
          </div>

          <div  style={{marginTop:"10px"}}>
          <div style={{width:"70px"}}>설명</div>
          <div style={{width:"150px",wordBreak:"break-all",fontSize:"1rem"}}>{specificChar.weapon.desc}</div>
          </div>
        </div>
 
      </Charcard>
      <Weaponcard style={{ backgroundColor: colorSet[specificChar.element] }}>
         {/* { JSON.stringify(weaponDetail)} */}  
        <div className="weapon desc" >
          <div style={{width:"500px"}}>
          <img className='charImg' src={ specificChar.image}></img>
          <img className='weaponImg' src={ specificChar.weapon.icon}></img>
          </div>
          <div style={{width:"600px"}}>
            {weaponDetail.map(idx => {
              if (idx.key !== "재련 재료") { 

                return (
                  <div className='weaponDesc' key={idx.key} style={{ display: 'flex', flexDirecton: 'row', justifyContent: "space-around", marginTop: "50px" }}>
                  <div style={{ width: "400px", marginTop: "20px", fontSize: "1.5rem" }}>{idx.key}</div>
                  <div style={{ width: "400px" }} dangerouslySetInnerHTML={{ __html: idx.value[0] }}></div>
                </div>
              
              )
            }
            })}
          </div>
        </div>
      </Weaponcard>
      <Articard style={{ backgroundColor: colorSet[specificChar.element] }}>
        <div className="img">
          {artiObject.map(idx => (
            <img src={idx.icon} key={ idx.id}></img>
          ))}
          <img src={ specificChar.image}></img>
        </div>
        <div className="arti desc">
          <div  style={{display:'flex',flexDirecton:'row',justifyContent:"space-around",marginTop:"50px"}}>
            <div>착용중인 성유물</div>
            <div dangerouslySetInnerHTML={{__html:settingCheck[0]}}></div>
          </div>
          <div style={{display:'flex',flexDirecton:'row',justifyContent:"space-around",marginTop:"50px"}}>
            <div style={ {width: "400px"}}>세트효과</div>
            <div className='artilist' style={ {width: "400px",marginRight:"50px",height:"150px"}}>
            {settingCheck[1].split('.').map((idx) => (
              <div key={idx}>{idx}</div>
            ))}

            </div>
          </div>
        </div>
      </Articard>
      <Starcard style={{ backgroundColor: colorSet[specificChar.element] }}>

        <div className="star">
          {
            specificChar.constellations.map((v) => {
              let newEffect = v.effect.replace(/\\n/gi, "<br/>")
              return (
                <div key={v.pos}  style={{ display: 'flex', background: v.is_actived === true ? "#c3804555" : "", borderRadius: "15px", marginLeft: "20px", marginBottom: "10px", textAlign: "center" ,height:"120px"}}>
                  <h2 style={{ margin: "45px 0 0 100px" }}>{v.pos}</h2>
                  <div style={{ width: "150px" }}><img src={v.icon} alt="" /></div>
                  <div style={{ marginTop: "45px" }}>{v.name} &nbsp;: &nbsp;</div>
                  <div>
                    <div className="starlist" style={{ width: "500px", marginTop: "10px", marginLeft:"35px" ,height:"70px"}} dangerouslySetInnerHTML={{ __html: newEffect }}></div>
                  </div>
                </div>
              )
            })}
      </div>
      </Starcard>
    </div>
  )
}

export default CharacterInfo

const Charcard = styled.div`
  min-height:350px;
  max-width:1250px;
  color:white;
  border-radius:15px;
  margin-top: 20px;
  padding: 20px;
  display:flex;
  justify-content:space-around;
  flex-wrap:wrap;
  .char{
    border:2px solid white;
    border-radius:15px;
    text-align: center;
    background-color:rgba(0,0,0,0.5); 
    height:350px;
    margin:20px 0 20px 0;
    }
  .img{ 
    width:300px;
     img{
    width: calc(100% - 110px);
    height: calc(100% - 150px);
    position:relative;
    top:12px;
  }
   }
   .weapon::-webkit-scrollbar{
   display:none;
 }
    .weapon{ 
      overflow:scroll;
    width:400px; 
      div{
      display:flex;
      justify-content:space-around;
      font-size:1.5rem;
    }

      img{
    width: calc(50% - 130px);
    height: calc(50% - 100px);
    position:relative;
      }
   }
 
  .stat{
    width:500px;//반응형처리
    display:flex;
    flex-direction:row;
    table{font-size:1.2rem;}
    progress::-webkit-progress-bar {
  background-color: white;
  width: 100%;
  border-radius:30px;
}

progress{ /* for FF target directly the element */
  background-color: white;
  width: 70%;
  height: 8px;
  border-radius:50px;
  margin-left:-30px;
  margin-bottom:7px;
  }
  
  progress::-webkit-progress-value {
    background-color: ${(props)=>props.barColor? props.barColor: 'black'};
    -webkit-transition: all .7s;
    transition: all .7s;
    border-radius:50px;
}

progress::-moz-progress-bar { /* for FF ::progress-bar is the value bar */
  background-color: ${(props)=>props.barColor? props.barColor: 'black'};
  transition: all .7s;
}

.progress-100::-webkit-progress-value {
  background-color: forestgreen !important;
  -webkit-transition: all .5s;
  transition: all .5s;
}

.progress-100::-moz-progress-bar {
  background-color: forestgreen !important;
  transition: all .5s;
}
    }
 
  hr{ height: 2px;
        background-color: white;
        border: none;}
`

const Weaponcard = styled.div`
  /* text-align:left; */
  font-size:1.5rem;
  min-height:300px;
  max-width:1250px;
  color:white;
  border-radius:15px;
  margin-top: 20px;
  padding: 20px;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  flex-wrap:wrap;
  .weapon{
    display:flex;
    flex-direction:row;
    border-radius:15px;
    text-align: center;
    background-color:rgba(0,0,0,0.5); 
    height:800px;
    margin:20px 0 20px 0;
    div{
    font-size:1.2rem;
    }
  }

  .desc{
    width:1200px;
    .charImg{
    width: calc(100% - 80px);
    height: calc(100% - 80px);
    }
    .weaponImg{
    width: calc(20%);
    height: calc(15%);
    position:relative;
    bottom:450px;
    left:230px;
    background-color:rgba(0,0,0,0.5); 
    border-radius:20px;
  }
  }

  .weaponDesc:last-child{
    height:250px;
    overflow:scroll;
  }

  .weaponDesc::-webkit-scrollbar{
    display:none;
  } 
`
const Articard = styled.div`
  /* text-align:left; */
  font-size:1.5rem;
  min-height:300px;
  max-width:1250px;
  color:white;
  border-radius:15px;
  margin-top: 20px;
  padding: 20px;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  flex-wrap:wrap;
  .arti{
    
    border-radius:15px;
    text-align: center;
    background-color:rgba(0,0,0,0.5); 
    height:300px;
    margin:20px 0 20px 0;
  }
  .img{
    width:330px;
    img{
    background-color:rgba(0,0,0,0.5); 
    border-radius:15px;
    margin: 55px 8px -45px 0;
    width: calc(50% - 80px);
    height: calc(50% - 60px);
    position:relative;
      }
  }
  .desc{
    width:800px;

  }

  .artilist{
    overflow:scroll;
  }

  .artilist::-webkit-scrollbar{
    display:none;
  } 
`

const Starcard = styled.div`

  font-size:1.5rem;
  min-height:600px;
  max-width:1250px;
  color:white;
  border-radius:15px;
  margin-top: 20px;
  padding: 20px;
  display:flex;
  flex-direction:row;

  flex-wrap:wrap;

  .starlist::-webkit-scrollbar{
    display:none;
  }
  .starlist{
    overflow:scroll;
    word-wrap: break-word;
  }
  .star{
    border-radius:15px;
    text-align: center;
    background-color:rgba(0,0,0,0.5); 
    width: 1150px;
    height:800px;
    margin:20px 0 20px 50px;
    font-size:20px;
    word-wrap: break-word;
      word-break: keep-all;
      div{
        margin:10px 20px 0 0;
       
      }
    }
  .img{grid-area:header; height:350px; background-color:rgba(0,0,0,0.5);   }
  .stat{grid-area:main;height:350px; display:flex; flex-direction:row; table{font-size:1.2rem;}  }
  .char{grid-area:menu; height:350px;  }
  /* img{
    width: calc(100% - 25px);
    height: calc(100% - 20px);
    position:relative;
    top:12px;
  } */
  hr{ height: 2px;
        background-color: white;
        border: none;}
`

