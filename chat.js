const puppeteer = require('puppeteer')

async function check() {
    const browser = await puppeteer.launch({headless: false});

    const page1 = await browser.newPage();
    await page1.goto('http://elbot-e.artificial-solutions.com/cgi-bin/elbot.cgi', {
        timeout: 6000000
    });
    
    

    const page2 = await browser.newPage();
    await page2.goto('https://www.eviebot.com/en/', {
        timeout: 6000000
    });

    async function resOne() {

        await page1.waitForSelector('table')
        let result1 = await page1.evaluate(resultOne)
        return result1
    }

    async function resTwo() {

        await page2.waitForSelector('#line1')
        let result2 = await page2.evaluate(resultTwo)
        return result2
    }

    let elbot;
    let evebot;

    for(let x = 0; x <= 1000; x++){

        elbot = await resOne();
        evebot = await resTwo();

        console.log("Elbot: " + elbot)
        console.log("evebot: " + evebot)

        await page1.bringToFront();
        await page1.type("input[name='ENTRY']", evebot)
        await page1.click("input[name='send']")
        // await page1.waitForNavigation({ waitUntil: 'networkidle0' })
        elbot = await resOne()

        await page2.bringToFront();
        await page2.type("input[name='stimulus']", elbot)
        await page2.click("input[name='sayitbutton']")
        // await page1.waitForNavigation({ waitUntil: 'networkidle0' })
        evebot = await resTwo()


    }

    
    await browser.close();
}

const resultOne = () => {
    let element = document.querySelector('table')
    let thead = element.children[0]
    let headTable = thead.children[2];
    let text = headTable.children[1].innerText
    return text

}

const resultTwo = () => {
    let p = document.querySelector('#line1')

    return new Promise(resolve => {
        let span;

        setTimeout( () => {
            span = p.children[0].innerText
            resolve(span)
        },3000)

        return span
    })
}

const pasteResFromEve = () => {

}


function blockingWait(seconds) {
    //simple blocking technique (wait...)
    const waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){}

}



check().catch( e => console.log(e))