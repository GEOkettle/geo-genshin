import React from 'react'

export default function Functions() {
  return (
    <div>Functions</div>
  )
}


export function twoArtiMatch(arr, Set, obj) {
console.log('before for')
console.log('Set : '+Set)
console.log('arr : ' + arr)
  let idx;
  for (let i = 0; i < Set.length; i++) {
    console.log(arr.indexOf(Set[i]))
    idx = arr.indexOf(Set[i])
    arr.splice(idx,1)
  }
const setNumber = obj.find(a => a.set.id === arr[0]).set.affixes[0].activation_number
const setName = obj.find(a => a.set.id === arr[0]).set.name
const setEffect = obj.find(a => a.set.id === arr[0]).set.affixes[0].effect
const OBJ = {
  number: setName+setNumber+'세트',
  effect: setEffect
}
return OBJ
};


export function twoTwosetOrFourset(arr,Set,obj) {
let firstIdxMatch = [];
let secondIdxMatch = [];
let matchedArti;
let OBJ;
for (let i = 0; i < arr.length; i++) { 
  if(arr[i]===Set[0]) firstIdxMatch= [...firstIdxMatch,arr[i]]
  if(arr[i]===Set[1]) secondIdxMatch= [...secondIdxMatch,arr[i]]
  }
//1 4 3 2
//4 1 2 3
switch (firstIdxMatch.length) {
case 1:
  matchedArti = obj.find(a => a.set.id === secondIdxMatch[0]).set;
  OBJ = {
  number: matchedArti.name + '   ' + matchedArti.affixes[1].activation_number + "세트",
  effect: `${matchedArti.affixes[0].effect}.${matchedArti.affixes[1].effect}`
  }
  return OBJ;
case 2: case 3 :
  let modifiedIdx= Set.map((idx)=>{
    return obj.find(a=>a.set.id===idx).set;
  })
   OBJ = {
      number: modifiedIdx[0].name + '  ' + modifiedIdx[0].affixes[1].activation_number + "세트<br/>" + modifiedIdx[1].name + '  ' + modifiedIdx[1].affixes[1].activation_number + "세트 적용중",
      effect: `${modifiedIdx[0].affixes[0].effect}.${modifiedIdx[1].affixes[0].effect}`
    }
    return OBJ
case 4:
  matchedArti = obj.find(a => a.set.id === firstIdxMatch[0]).set;
  OBJ = {
  number: matchedArti.name+'   '+ matchedArti.affixes[1].activation_number+"세트",
  effect:`${matchedArti.affixes[0].effect}.${ matchedArti.affixes[1].effect}`
  }
  return OBJ
}
}

export  function onlyTwoTwoSet(arr,Set,obj) { 
    //2 2 1 
    let firstIdxMatch = [];
    let secondIdxMatch = [];
    let thirdIdxMatch = [];
    for (let i = 0; i < arr.length; i++) { 
    if(arr[i]===Set[0]) firstIdxMatch=[...firstIdxMatch,arr[i]]
    if(arr[i]===Set[1]) secondIdxMatch=[...secondIdxMatch,arr[i]]
    if(arr[i]===Set[2]) thirdIdxMatch=[...thirdIdxMatch,arr[i]]
    }
    let matchedIndex = [firstIdxMatch, secondIdxMatch, thirdIdxMatch];

    matchedIndex = matchedIndex.filter(idx => idx.length === 2);

    let modifiedIdx = matchedIndex.map((idx) => { 
      return  obj.find(a=>a.set.id===idx[0]).set;
    })
    let OBJ = {
      number: modifiedIdx[0].name + '  ' + modifiedIdx[0].affixes[0].activation_number + "세트<br/>" + modifiedIdx[1].name + '  ' + modifiedIdx[1].affixes[0].activation_number + "세트 적용중",
      effect: `${modifiedIdx[0].affixes[0].effect}.${modifiedIdx[1].affixes[0].effect}`
    }
    return OBJ
    }

export function allInOne(obj){
  let modifyedArti = obj[0].set;
  let OBJ={
    number: modifyedArti.name + '  ' +modifyedArti.affixes[1].activation_number+'세트',
    effect: `${modifyedArti.affixes[0].effect}.${modifyedArti.affixes[1].effect}`  }
    return OBJ
}