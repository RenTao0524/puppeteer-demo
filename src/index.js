const puppeteer = require("puppeteer");

puppeteer
  .launch({
    slowMo: 200,
    headless: false,
  })
  .then(async (browser) => {
    await login(browser)
    await sleep(3000)
    await gotoJiraPage(browser)
  });

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

async function login(browser) {
  const page = await browser.newPage();
  await page.goto("https://did-sso.bba-app.biz/b2bloginhtml/index.html?bmctx=86A43AC017E77E0242FC614C41AD4B856005A7D1605CAA05305FE1BB92A1FA3F&contextType=external&username=string&password=secure_string&challenge_url=https%3A%2F%2Fdid-sso.bba-app.biz%2Fb2bloginhtml%2Findex.html&targetid=did_bmw&request_id=6173111550440630786&authn_try_count=0&locale=zh_CN&resource_url=https%253A%252F%252Fdid-sso.bba-app.biz%252Fserveroidclogin%253Fscope%253Dopenid%252520email%252520profile%252520phone%252520address%252520offline_access%252520bbaAtcUid%2526state%253DoCvQGFY99sls5dhtBw6TqwTgQkRyEgd9YqM8uzlqiCw.dKspcMKVVm4.security-admin-console%2526response_type%253Dcode%2526client_id%253D55ajetbxzikdk%2526redirect_uri%253Dhttps%253A%252F%252Fatc.bmw-brilliance.cn%252Fauth%252Frealms%252Fmaster%252Fbroker%252Foidc%252Fendpoint%2526nonce%253DfQeyl9e-MRO2dx3lqvMavg");
}

async function gotoJiraPage(browser) {
  const page2 = await browser.newPage();
  await page2.goto("https://atc.bmw-brilliance.cn/jira/secure/Dashboard.jspa");
}
