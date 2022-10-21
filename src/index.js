const puppeteer = require("puppeteer");
const { pageUrl, userInfo, assigneeUserName } = require('./constants')

const summary_description = 'summary demo'

puppeteer
  .launch({
    slowMo: 200,
    headless: false,
  })
  .then(async (browser) => {
    await login(browser)
    await sleep(30000)
    const page = await gotoJiraPage(browser)
    await createTask(page)
  });

async function createTask(page) {
  await page.waitForSelector('#create_link')
  const createBtn = await page.$('#create_link')
  await createBtn.click()

  await page.waitForSelector('#issuetype-field')
  // issue type
  const issueTypeSelect = await page.$('#issuetype-field')
  await issueTypeSelect.click()

  // await page.waitForSelector('.aui-list-item-li-task')
  // await page.evaluate(() => {
  //   console.log(document.querySelector('.aui-list-item-li-task'))
  // })

  const summaryInput = await page.$('#summary')
  await summaryInput.type(summary_description)

  const assigneeFieldInput = await page.$('#assignee-field')
  await assigneeFieldInput.type(assigneeUserName)
  await page.waitForSelector('#assignee-suggestions')
  await page.evaluate(() => {
    document.querySelector('#suggestions').childNodes[0].click()
  })
}

async function gotoJiraPage(browser) {
  const page2 = await browser.newPage();
  await page2.goto(pageUrl);
  return page2
}

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

async function login(browser) {
  const page = await browser.newPage();
  await page.goto(pageUrl);

  const userInfoInput = await page.$('.b_login_input')
  await userInfoInput.type(userInfo.u)
  const passewordInput = await page.$('#password')
  await passewordInput.type(userInfo.password)

}
