import axios from 'axios';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
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


const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded( {extended : false } ));// bodyparser
app.use(express.json()); // bodyparser
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  cors({ origin: "geo-genshin.exciting-chantalle.koyeb", credentials: true })
);
app.listen(port, () => {
  console.log("server runs at 5000");
});

app.post("/main", (req, res) => {
  //처음에 접속해서 스켈레톤 보여주고
  // 통행증 ID 입력하면 JSON으로 넘기고(콘텍스트api에 저장)
  //보유캐릭정보만 넘겨줌(1화면)
  //다음탭은 통계 (2화면)
  console.log(req.body)
  let gottendID;
  const ltuid = gottendID || 165181087;
  
  (async () => {
      //ltuid와 accountid는 클라이언트에서 받은 통행증아이디로 대체할 수 있게
      //ltuid => 조회당하는 계정 accountid => 조회하는계정
      //cookie_token은 로그인한 내계정으로 설정되있는데 이게 기간이 하루짜리라서 다른사람이 계속 내어플로 조회하고싶으면 하루한번 호요랩들어가서 로그인해줘서 토큰을 연장시켜 줘야됨.
      const cookie = `_MHYUUID=${getUuid()}; G_ENABLED_IDPS=google; _ga=GA1.2.945851836.1668241513; _gid=GA1.2.617282950.1673273808; ltoken=G5acZwBleY5LzVA69MhAV48QjdBsoxYf22S3nyWV; ltuid=${ltuid}; cookie_token=1a0lvyJ9fLuY6DeExuCq58nyJMZfwmf5dHys84ly; account_id=165181087; mi18nLang=ko-kr;`;
      // const cookie = `_MHYUUID=${getUuid()}; G_ENABLED_IDPS=google; _ga=GA1.2.945851836.1668241513; _gid=GA1.2.617282950.1673273808; ltoken=G5acZwBleY5LzVA69MhAV48QjdBsoxYf22S3nyWV; ltuid=173436652; cookie_token=1a0lvyJ9fLuY6DeExuCq58nyJMZfwmf5dHys84ly;   account_id=165181087; mi18nLang=ko-kr;`;
      const dataMachine = axios.create({
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
          Cookie: cookie,
          Accept: "application/json;charset=utf-8",
          // Referrer: "https://webstatic-sea.mihoyo.com/",
          Referrer: "https://act.hoyolab.com/",
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
      const result = await dataMachine
        .get(
          `https://bbs-api-os.hoyolab.com/game_record/card/wapi/getGameRecordCard?uid=${
            parseCookie(cookie).ltuid
          }`
        )
      .then((res) => res.data.data.list[0])
      .catch((err) => console.log(err));
    
      const gameRoleId = result.game_role_id;
      const server = result.region; 
    
      let now = new Date();
    let currentMonth = now.getMonth() + 1;
      console.log(`currentMonth : ` + currentMonth);
      const travelerNote = await dataMachine
        .get(
          `https://sg-hk4e-api.hoyolab.com/event/ysledgeros/month_info?month=${currentMonth}&region=os_asia&uid=${gameRoleId}&lang=ko-kr`
        )
        .then((res) => res.data.data);



      let notePrimoRewards = [];
      let i = 1;
      while (true) {
        const detailPrimoNote = await dataMachine
          .get(
            `https://hk4e-api-os.mihoyo.com/event/ysledgeros/month_detail?month=${currentMonth}&current_page=${i}&type=1&region=${server}&uid=${gameRoleId}&lang=ko-kr`
          )
          .then((res) => res.data.data?.list)
        if (!detailPrimoNote) break;
        if (!detailPrimoNote.length) break;
        notePrimoRewards.push(detailPrimoNote);
      
        i++;
      }
      notePrimoRewards = notePrimoRewards.flat();
      console.log(
        `${currentMonth}월 원석보상 ${notePrimoRewards.length}번 받았음`
    );
    

    let noteMoraRewards = [];
    let j = 1;
    while (true) {
      const detailMoraNote = await dataMachine
        .get(
          `https://hk4e-api-os.mihoyo.com/event/ysledgeros/month_detail?month=${currentMonth}&current_page=${j}&type=2&region=${server}&uid=${gameRoleId}&lang=ko-kr`
        )
        .then((res) => res.data.data?.list);
      if (!detailMoraNote) break;
      if (!detailMoraNote.length) break;

      noteMoraRewards.push(detailMoraNote);

      j++;
    }
    noteMoraRewards = noteMoraRewards.flat();
    console.log(
      `${currentMonth}월 모라보상 ${noteMoraRewards.length}번 받았음`
    );

      const profile = await dataMachine
        .get(
          `https://bbs-api-os.mihoyo.com/game_record/genshin/api/index?server=${server}&role_id=${gameRoleId};`
        )
        .then((res) => res.data.data);

      const character = await dataMachine
        .post(
          "https://bbs-api-os.mihoyo.com/game_record/genshin/api/character",
          {
            // character_ids: profile.avatars.map(c => c.id),
            role_id: gameRoleId,
            server,
          }
        )
      .then((res) => res.data.data);
    
      // console.log(character);
      // console.log(character.avatars.find(c => c.name === '베넷').weapon);
      res.send({
        user: result,
        profile: profile,
        character: character,
        mora: noteMoraRewards,
        primo: notePrimoRewards
  
      })
    })();

})
