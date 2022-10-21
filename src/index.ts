import puppeteer from 'puppeteer'
import { pageUrl, userInfo, assigneeUserName } from './constants'

const summary_description = 'summary demo'

puppeteer
  .launch({
    slowMo: 200,
    headless: false,
  })
  .then(async (browser: puppeteer.Browser) => {
    await login(browser)
    await sleep(30000)
    const page = await gotoJiraPage(browser)
    await createTask(page)
  });

async function createTask(page: puppeteer.Page) {
  await page.waitForSelector('#create_link')
  const createBtn = await page.$('#create_link')
  createBtn && await createBtn.click()

  await page.waitForSelector('#issuetype-field')
  // issue type
  const issueTypeSelect = await page.$('#issuetype-field')
  issueTypeSelect && await issueTypeSelect.click()

  // await page.waitForSelector('.aui-list-item-li-task')
  // await page.evaluate(() => {
  //   console.log(document.querySelector('.aui-list-item-li-task'))
  // })

  const summaryInput = await page.$('#summary')
  summaryInput && await summaryInput.type(summary_description)

  const assigneeFieldInput = await page.$('#assignee-field')
  assigneeFieldInput && await assigneeFieldInput.type(assigneeUserName)
  await page.waitForSelector('#assignee-suggestions')
  await page.evaluate(() => {
    const element = document.querySelector('#suggestions')?.childNodes[0]
    if (element instanceof HTMLElement) {
      element.click();
    }
  })
}

async function gotoJiraPage(browser: puppeteer.Browser) {
  const page2 = await browser.newPage();
  await page2.goto(pageUrl);
  return page2
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time);
  })
}

async function login(browser: puppeteer.Browser) {
  const page = await browser.newPage();
  await page.goto(pageUrl);

  const userInfoInput = await page.$('.b_login_input')
  userInfoInput && await userInfoInput.type(userInfo.u)
  const passewordInput = await page.$('#password')
  passewordInput && await passewordInput.type(userInfo.password)
}
