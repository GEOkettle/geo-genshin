import React, { useEffect, useState } from 'react'
import useStore from '../store/store'

function Statistics() {
  const { worldExp, userInfo,userId } = useStore()
  //dev
  const getCurrency = async () => {
    const res = await fetch(
      "http://localhost:5000/currency", {
    mode: 'cors',credentials:'include',
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',    'Access-Control-Allow-Origin':'http://localhost:5000'},
    body: JSON.stringify({ uid: userId,gameRoleId:userInfo.game_role_id,server:userInfo.region })
    }).then(res => {  return res.json() })
      .then((res) => {
        console.log(res)
      }
    )
  }
  //prod
  // const getCurrency = async () => {
  //   const res = await fetch(
  //     "http://3.144.80.94/currency", {
  //   mode: 'cors',credentials:'include',
  //   method: 'POST',
  //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',    'Access-Control-Allow-Origin':'http://3.144.80.94'},
  //   body: JSON.stringify({ uid: userId,gameRoleId:userInfo.game_role_id,server:userInfo.region })
  //   }).then(res => {  return res.json() })
  //     .then((res) => {
  //       console.log(res)
  //     }
  //   )
  // }
  useEffect(() => { 
    getCurrency()
  },[])
  console.log(worldExp)
 
  return (
    <div id="c"></div>
  )
}

export default Statistics