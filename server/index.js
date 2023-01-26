import axios from 'axios';
import express from 'express'
import cors from 'cors'

import dotenv from "dotenv";
import {
  parseCookie,
  getUuid,
  generateDSToken,
  randomString,
} from "./util/functions.js";

///https://www.hoyolab.com/home
//https://wiki.hoyolab.com/pc/genshin/entry/30
//https://arca.live/b/genshin/37171743
//https://www.npmjs.com/package/@mihoyo-kit/genshin-api
// https://act.hoyolab.com/ys/event/e20210923journal/index.html#/
dotenv.config();
const {
  MODE,
  PORT,
  CORS_ORIGIN_DEV,
  CORS_ORIGIN_PROD1,
  CORS_ORIGIN_PROD2,
  BASIC_UID,
  LTOKEN,
  CTOKEN,
  ACCID,
} = process.env;
const app = express();
const port = PORT || 5000
app.use(express.urlencoded( {extended : false } ));// bodyparser
app.use(express.json()); // bodyparser
// local
// app.use(cors({ origin:[${CORS_ORIGIN}], credentials: true }));
//prod
if (MODE === "development") {
  
  app.use(
    cors({
      origin: [`${CORS_ORIGIN_DEV}`],
      credentials: true,
    })
  );
} else if (MODE === "production") { 
  app.use(
    cors({
      origin: [`${CORS_ORIGIN_PROD1}`, `${CORS_ORIGIN_PROD2}`],
      credentials: true,
    })
  );

}





app.listen(port, () => {
  console.log(`server running at ${port}`);
});

let ltuid = BASIC_UID;
  
 const cookie = `_MHYUUID=${getUuid()}; G_ENABLED_IDPS=google; _ga=GA1.2.945851836.1668241513; _gid=GA1.2.617282950.1673273808;  ltoken=${LTOKEN}; ltuid=${ltuid}; cookie_token=${CTOKEN}; account_id=${ACCID}; mi18nLang=ko-kr;`;

const dataMachine = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    Cookie: cookie,
    Accept: "application/json;charset=utf-8",
    // Referrer: "https://webstatic-sea.mihoyo.com/",
    referer: "https://act.hoyolab.com/",
    "x-rpc-language": "ko-kr",
    "x-rpc-client_type": "4",
    "x-rpc-app_version": "1.5.0",
    DS: "",
  },
});

dataMachine.interceptors.request.use((config) => {
  config.headers.DS = generateDSToken();
  return config;
});
const dataMachine2 = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    Cookie: cookie,
    Accept: "application/json;charset=utf-8",
    // Referrer: "https://webstatic-sea.mihoyo.com/",
    referer: "https://wiki.hoyolab.com" ,//
    "x-rpc-language": "ko-kr",  
    DS: "",
  },
});

dataMachine2.interceptors.request.use((config) => {
  config.headers.DS = generateDSToken();
  return config;
});

app.post("/main", (req, res) => {
  (async () => {
      //ltuid와 accountid는 클라이언트에서 받은 통행증아이디로 대체할 수 있게
      //ltuid => 조회당하는 계정 accountid => 조회하는계정
      //cookie_token은 로그인한 내계정으로 설정되있는데 이게 기간이 하루짜리라서 다른사람이 계속 내어플로 조회하고싶으면 하루한번 호요랩들어가서 로그인해줘서 토큰을 연장시켜 줘야됨.

//get userUID and server
const result = await dataMachine
.get(`https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard?uid=${parseCookie(cookie).ltuid}`)
.then((res) => res.data.data.list[0])
.catch((err) => console.log(err));

const gameRoleId = result.game_role_id;
const server = result.region; 

//get userProfile    
const profile = await dataMachine
.get(`https://bbs-api-os.mihoyo.com/game_record/genshin/api/index?server=${server}&role_id=${gameRoleId};`)
.then((res) => res.data.data)
.catch((err) => console.log(err));
//get user's character list
const character = await dataMachine
.post("https://bbs-api-os.mihoyo.com/game_record/genshin/api/character",
{// character_ids: profile.avatars.map(c => c.id),
role_id: gameRoleId,
server:server,
})
.then((res) => res.data.data)
.catch((err) => console.log(err));    

// console.log(character);
// console.log(character.avatars.find(c => c.name === '베넷').weapon);
res.send({
user: result,
profile: profile,
character: character,
})
    
})();
})

app.post("/weapon", (req, res) => {
(async () => {
console.log(req.body)
  let allWeaponList = [];
  let i = 1;
  while (true) {
    const allWeapon = await dataMachine2
      .post(
        `https://sg-wiki-api.hoyolab.com/hoyowiki/wapi/get_entry_page_list`,
        { filter: [], menu_id: "4", page_num: i, page_size: 30, use_es: true }
      )
      .then((res) => res.data.data.list)
      .catch((err) => console.log(err));
      if (!allWeapon) break;
      if (!allWeapon.length) break;
      allWeaponList=[...allWeaponList,...allWeapon];

      i++;
  }
  // console.log(allWeaponList)

  const weaponID = allWeaponList.find(w => w.name === req.body.weaponName).entry_page_id
  const weaponDetail = await dataMachine2.get(
    `https://sg-wiki-api-static.hoyolab.com/hoyowiki/wapi/entry_page?entry_page_id=${weaponID}`,
    {entry_page_id:weaponID}
  )
  .then(res => res.data.data.page)
  .catch((err) => console.log(err))
  
  res.send({
    weaponDetail:weaponDetail
  })
})();
});

app.post("/currency", (req, res) => {

  (async () => {
    console.log(req.body);

    let now = new Date();
    let currentMonth = now.getMonth() + 1;
    console.log(`currentMonth : ` + currentMonth);
    ltuid = req.body.uid;
    const gameRoleId = req.body.gameRoleId;
    const server = req.body.server;
   const currentAbyss = await dataMachine
     .get(
       "https://bbs-api-os.hoyolab.com/game_record/genshin/api/spiralAbyss?role_id=840554084&server=os_asia&schedule_type=1", {
    role_id: "840554084",
    server:  "os_asia",
    schedule_type: "1"}
     )
     .then((res) => res.data.data)
     .catch((err) => console.log(err));
   const lastAbyss = await dataMachine
     .get(
       "https://bbs-api-os.hoyolab.com/game_record/genshin/api/spiralAbyss?role_id=840554084&server=os_asia&schedule_type=2", {
    role_id: "840554084",
    server:  "os_asia",
    schedule_type: "2"}
     )
     .then((res) => res.data.data)
     .catch((err) => console.log(err));
    
    const travelerNote = await dataMachine
      .get(
        `https://sg-hk4e-api.hoyolab.com/event/ysledgeros/month_info?month=${currentMonth}&region=${server}&uid=${gameRoleId}&lang=ko-kr`
      )
      .then((res) => res.data.data)
      .catch((err) => console.log(err));
    // console.log(travelerNote);
    // let notePrimoRewards = [];
    // let i = 1;
    // while (true) {
    //   const detailPrimoNote = await dataMachine
    //     .get(
    //       `https://hk4e-api-os.mihoyo.com/event/ysledgeros/month_detail?month=${currentMonth}&current_page=${i}&type=1&region=${server}&uid=${gameRoleId}&lang=ko-kr`,
    //       {
    //         body: {
    //           month: "0",
    //           region: "os_asia",
    //           uid: "840554084",
    //           lang: "ko-kr",
    //         },
    //       }
    //     )
    //     .then((res) => res.data.data?.list);
    //   if (!detailPrimoNote) break;
    //   if (!detailPrimoNote.length) break;
    //   notePrimoRewards.push(detailPrimoNote);

    //   i++;
    // }
    // notePrimoRewards = notePrimoRewards.flat();

    // let noteMoraRewards = [];
    // let j = 1;
    // while (true) {
    //   const detailMoraNote = await dataMachine
    //     .get(
    //       `https://hk4e-api-os.mihoyo.com/event/ysledgeros/month_detail?month=${currentMonth}&current_page=${j}&type=2&region=${server}&uid=${gameRoleId}&lang=ko-kr`,{body:{
    //       month: "0",
    //       region: "os_asia",
    //       uid: "840554084",
    //       lang: "ko-kr"
    //       }}
    //     )
    //     .then((res) => res.data.data?.list);
    //   if (!detailMoraNote) break;
    //   if (!detailMoraNote.length) break;

    //   noteMoraRewards.push(detailMoraNote);

    //   j++;
    // }
    // noteMoraRewards = noteMoraRewards.flat();

    //abyss
    //https://bbs-api-os.hoyolab.com/game_record/genshin/api/spiralAbyss?role_id=840554084&server=os_asia&schedule_type=1
    //https://bbs-api-os.hoyolab.com/game_record/genshin/api/spiralAbyss?role_id=840554084&server=os_asia&schedule_type=2
 
    res.send({
      status: "okay",
      // mora: noteMoraRewards,
      // primo: notePrimoRewards,
      currentAbyss: currentAbyss,
      lastAbyss:lastAbyss,
      travelerNote:travelerNote
    });
  })();
      })