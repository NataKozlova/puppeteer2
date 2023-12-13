const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on page", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("user choose day", async function () {
  return await clickElement(this.page, "body > nav > a:nth-child(3)");
});

When("user choose movie", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li > a");
});
When("user choose place", async function () {
  return await clickElement(this.page, "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(5)" );
});
When("user press to book button", async function () {
  return await clickElement(this.page, "body > main > section > button");
});
When("user choose another place", async function () {
  return await clickElement(this.page,"body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span:nth-child(8)");
});

When("user choose occupied place", async function () {
  return await clickElement(this.page,"body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(7) > span:nth-child(5)");
});
Then("user sees label button {string}", async function (string) {
  const actual = await getText(this.page, "body > main > section > div > button");
  const expected = await string;
  expect(actual).contains(expected);
});
Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page,"body > main > section > div > p:nth-child(2) > span");
  const expected = await string;
  expect(actual).contains(expected);
});
Then("user sees button is disabled", async function () {
  const isDisabled = await this.page.$("button[disabled]") !== null;
    expect(isDisabled).to.be.true;
});


