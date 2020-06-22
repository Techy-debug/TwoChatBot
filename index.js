const xlsx = require('xlsx');
const puppeteer = require('puppeteer')

const wb = xlsx.readFile('urls (4).xlsx')

const ws = wb.Sheets['urls']

const data = xlsx.utils.sheet_to_json(ws)


async function browserFunction() {
  
  for(let x = 56; x <= data.length - 1; x++){

    const url = data[x].URL
    console.log(x, url)

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: `./img/${x}.png`});
    
    await browser.close();
  
     
  
  }
  
}


browserFunction()