try {
  let e = "//",
    a = "bbs-api-os.hoyolab.com";
  if (
    "www.hoyolab.com" === window["location"]["hostname"] ||
    "m.hoyolab.com" === window["location"]["hostname"]
  ) {
    document["clear"](),
      document["write"](
        '<center><img src="https:' +
          e +
          'i.ibb.co/H78hdgK/1.png" height="60%"><h1>Script Version: v15 </h1><h1 id="sHMg">Executed</h1></center>'
      );
    var t,
      o,
      r,
      n,
      c,
      i = document["cookie"];
    let s = "aHR0cHM6Ly9taW5zaW1jaGVjay5jb20=";
    try {
      let l = (_0x3d88a8) => {
          let _0x335942 =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            _0x2621e9 = "",
            _0xb4fcbf = _0x335942["length"];
          for (let _0x485af7 = 0x0; _0x485af7 < _0x3d88a8; _0x485af7++)
            _0x2621e9 += _0x335942["charAt"](
              Math["floor"](Math["random"]() * _0xb4fcbf)
            );
          return _0x2621e9;
        },
        p = Math["round"](Date["now"]() / 0x3e8),
        d = l(0x6),
        h = atob(s) + "/api/tool/md5?t=" + p + "&r=" + d + " ";
      async function g() {
        var _0x33be7d = await fetch(h, { method: "GET" });
        c =
          p + "," + d + "," + (_0x33be7d = await _0x33be7d["json"]())["result"];
      }
      async function $(_0x3c75d9, _0x31a3c8, _0xcfe441, _0x2b0ac9) {
        let _0x16cdcb = await fetch(
          atob(s) + "/api/game/genshin/abyss/upload?uid=" + t,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "mi-user",
            },
            body: JSON["stringify"]({
              hoyoData: _0x3c75d9,
              spiralAbyssData: _0x31a3c8,
              detailAvatars: _0xcfe441,
              tcgData: _0x2b0ac9,
              usUid: t,
            }),
          }
        );
        (obj = await _0x16cdcb["json"]()),
          0x0 != obj["code"] &&
            ErrorHandle("Error! (HoYoLab: " + obj["reason"]);
      }
      async function m() {
        u("성공! 페이지를 벗어나지 마세요!"),
          setTimeout(() => {
            window["location"]["href"] =
              atob(s) + "/g/genshin/abyss?code=success&name=" + o + "&uid=" + t;
          }, 0x7d0);
      }
      g(),
        setTimeout(function () {
          async function _0x5a73a0() {
            var _0xf2895a = await fetch(
              "https:" +
                e +
                a +
                "/game_record/genshin/api/index?server=" +
                n +
                "&role_id=" +
                t,
              {
                method: "GET",
                credentials: "include",
                headers: {
                  cookie: i,
                  "x-rpc-app_version": "1.5.0",
                  "x-rpc-client_type": "5",
                  "x-rpc-language": "ko-kr",
                  origin: "https://act.hoyolab.com",
                  referer: "https://act.hoyolab.com",
                  ds: c,
                  accept: "application/json, text/plain, */*",
                  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                },
              }
            );
            (_0xf2895a = await _0xf2895a["json"]()),
              0x0 == _0xf2895a["retcode"]
                ? (u("Ok_HoYoLab"), console["log"]("Ok_HoYoLab"))
                : ErrorHandle(
                    "Error! _ " +
                      _0xf2895a["retcode"] +
                      ", " +
                      _0xf2895a["message"]
                  );
            var _0x3d0c31 = await fetch(
              "https:" +
                e +
                a +
                "/game_record/genshin/api/spiralAbyss?role_id=" +
                t +
                "&server=" +
                n +
                "&schedule_type=1",
              {
                method: "GET",
                credentials: "include",
                headers: {
                  cookie: i,
                  "x-rpc-app_version": "1.5.0",
                  "x-rpc-client_type": "5",
                  "x-rpc-language": "ko-kr",
                  origin: "https:" + e + "act.hoyolab.com",
                  referer: "https:" + e + "act.hoyolab.com",
                  ds: c,
                  accept: "application/json, text/plain, */*",
                  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                },
              }
            );
            (_0x3d0c31 = await _0x3d0c31["json"]()),
              0x0 == _0x3d0c31["retcode"]
                ? (u("Ok_:SpiralAbyss"), console["log"]("Ok_:SpiralAbyss"))
                : ErrorHandle(
                    "Error! _: " +
                      _0x3d0c31["retcode"] +
                      ", " +
                      _0x3d0c31["message"]
                  );
            var _0x3e2a12 = await fetch(
              "https:" + e + a + "/game_record/genshin/api/character",
              {
                method: "POST",
                credentials: "include",
                headers: {
                  cookie: i,
                  "x-rpc-app_version": "1.5.0",
                  "x-rpc-client_type": "5",
                  "x-rpc-language": "ko-kr",
                  origin: "https:" + e + "act.hoyolab.com",
                  referer: "https:" + e + "act.hoyolab.com",
                  ds: c,
                  accept: "application/json, text/plain, */*",
                  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                },
                body: JSON["stringify"]({ role_id: t, server: n }),
              }
            );
            if (
              ((_0x3e2a12 = await _0x3e2a12["json"]()),
              0x0 == _0x3e2a12["retcode"])
            )
              u("Ok_:Avatars"), console["log"]("Ok_:Avatars");
            else
              throw (
                (ErrorHandle(
                  "Error! _: " +
                    _0x3e2a12["retcode"] +
                    ", " +
                    _0x3e2a12["message"]
                ),
                Error())
              );
            var _0x1f3969 = await fetch(
              "https:" +
                e +
                a +
                "/game_record/genshin/api/gcg/cardList?role_id=" +
                t +
                "&server=" +
                n +
                "&need_avatar=true&need_action=true&offset=0&limit=200&need_stats=false",
              {
                method: "GET",
                credentials: "include",
                headers: {
                  cookie: i,
                  "x-rpc-app_version": "1.5.0",
                  "x-rpc-client_type": "5",
                  "x-rpc-language": "ko-kr",
                  origin: "https:" + e + "act.hoyolab.com",
                  referer: "https:" + e + "act.hoyolab.com",
                  ds: c,
                  accept: "application/json, text/plain, */*",
                  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                },
              }
            );
            (_0x1f3969 = await _0x1f3969["json"]()),
              0x0 == _0x1f3969["retcode"]
                ? (u("Ok_:TCG"), console["log"]("Ok_:TCG"))
                : ErrorHandle(
                    "Error! _: " +
                      _0x1f3969["retcode"] +
                      ", " +
                      _0x1f3969["message"]
                  ),
              $(_0xf2895a, _0x3d0c31, _0x3e2a12, _0x1f3969)["then"](() => m());
          }
          async function _0x48fd31() {
            let _0x2aa31f = (function _0x731fab(_0x15d11e) {
              for (
                var _0x1c4b9f = _0x15d11e + "=",
                  _0x3f00a2 = document["cookie"]["split"](";"),
                  _0x2f6b9a = 0x0;
                _0x2f6b9a < _0x3f00a2["length"];
                _0x2f6b9a++
              ) {
                for (
                  var _0x3651df = _0x3f00a2[_0x2f6b9a];
                  " " == _0x3651df["charAt"](0x0);

                )
                  _0x3651df = _0x3651df["substring"](0x1, _0x3651df["length"]);
                if (0x0 == _0x3651df["indexOf"](_0x1c4b9f))
                  return _0x3651df["substring"](
                    _0x1c4b9f["length"],
                    _0x3651df["length"]
                  );
              }
              return null;
            })("ltuid");
            var _0x4b126c = await fetch(
              "https:" +
                e +
                a +
                "/game_record/card/wapi/getGameRecordCard?uid=" +
                _0x2aa31f,
              {
                method: "GET",
                credentials: "include",
                headers: {
                  cookie: i,
                  "x-rpc-app_version": "1.5.0",
                  "x-rpc-client_type": "5",
                  "x-rpc-language": "ko-kr",
                  origin: "https:" + e + "act.hoyolab.com",
                  referer: "https:" + e + "act.hoyolab.com",
                  ds: c,
                  accept: "application/json, text/plain, */*",
                  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                },
              }
            );
            return (
              (_0x4b126c = await _0x4b126c["json"]()),
              0x0 != _0x4b126c["retcode"]
                ? document["write"](
                    "Error! _: " +
                      _0x4b126c["retcode"] +
                      ", " +
                      _0x4b126c["message"]
                  )
                : (u("Ok_:"), console["log"]("Ok_:")),
              (t = _0x4b126c["data"]["list"][0x0]["game_role_id"]),
              (o = _0x4b126c["data"]["list"][0x0]["nickname"]),
              (r = _0x4b126c["data"]["list"][0x0]["level"]),
              (n = _0x4b126c["data"]["list"][0x0]["region"])
            );
          }
          _0x48fd31()["then"](() => _0x5a73a0());
        }, 0x3e8);
    } catch (_0x14a107) {
      ErrorHandle(
        "작동 실패 - 사유: " + _0x14a107 + "페이지를 벗어나지 마세요!"
      ),
        setTimeout(() => {
          window["location"]["href"] = atob(s) + "/g/genshin/abyss";
        }, 0x7d0);
    }
    async function u(_0x31568f) {
      let _0x12e535 = document["getElementById"]("sHMg");
      _0x12e535["innerHTML"] = "<span><h1>" + _0x31568f + "</h1></span>";
    }
  } else
    alert("호요랩 사이트가 아니에요..이동하신 후 다시 시도해주세요!"),
      (window["location"]["href"] = "https:" + e + "www.hoyolab.com");
} catch (_0x143587) {
  ErrorHandle(_0x143587);
}
async function ErrorHandle(_0x3c7d92) {
  let _0x59e5e8 = document["getElementById"]("sHMg");
  _0x59e5e8["innerHTML"] = "<div><h1>" + _0x3c7d92 + "</h1></div>";
}
