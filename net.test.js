const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});
  
describe("Book", () => {
  test("Should book a place", async () => {
    await clickElement(page, "body > nav > a:nth-child(3)");
    await clickElement(page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a");
    await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(5)" );
    await clickElement(page, "body > main > section > button");
    const actual = await getText(page, "body > main > section > div > button");
    expect(actual).toContain("Получить код бронирования");
  });
  test("Should book different places", async () => {
    await clickElement(page,"body > nav > a:nth-child(5)");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
    await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(8) > span:nth-child(5)" );
    await clickElement(page,"body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(8)");
    await clickElement(page, "body > main > section > button");
    const actualPlace = await getText(page,"body > main > section > div > p:nth-child(2) > span");
    expect(actualPlace).toContain("4/8, 8/5");
    const actualButton = await getText(page, "body > main > section > div > button");
    expect(actualButton).toContain("Получить код бронирования");
  });
   test("Must not book a place", async () => {
    await clickElement(page,"body > nav > a:nth-child(4)");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li > a");
    await clickElement(page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(7) > span:nth-child(5)" );
    const isDisabled = await page.$("button[disabled]") !== null;
    expect(isDisabled).toBeTruthy();
  });

});
