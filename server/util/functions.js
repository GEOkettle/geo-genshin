import crypto from "crypto";

export function parseCookie(cookies) {
  const output = {};
  try {
    cookies.split(/\s*;\s*/).forEach((pair) => {
      pair = pair.split(/\s*=\s*/);
      output[pair[0]] = pair.splice(1).join("=");
    });
    return output;
  } catch {
    return undefined;
  }
}

export function getUuid() {
  for (var e = [], n = 0; n < 36; n++) {
    e[n] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
  }

  e[14] = "4";
  e[19] = "0123456789abcdef".substr((3 & e[19]) | 8, 1);
  e[8] = e[13] = e[18] = e[23] = "-";
  return e.join("");
}
export function generateDSToken() {
  const time = Math.floor(Date.now() / 1000);
  const DS_SALT = "6cqshh5dhw73bzxn20oexa9k516chk7s";
  const randomChar = randomString(6);
  const data = `salt=${DS_SALT}&t=${time}&r=${randomChar}`;
  const hash = crypto.createHash("md5").update(data).digest("hex");
  return `${time},${randomChar},${hash}`;
}

export function randomString(len = 6, an) {
  an = an && an.toLowerCase();
  let str = "";
  let i = 0;
  let min = an === "a" ? 10 : 0;
  let max = an === "n" ? 10 : 62;
  for (; i++ < len; ) {
    let r = (Math.random() * (max - min) + min) << 0;
    str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  return str;
}
