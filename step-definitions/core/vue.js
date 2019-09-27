import { client } from 'nightwatch-api';
import { Given, When, Then } from 'cucumber';

import { setupEvan } from '../../test-utils/test-utils.js';

let loggedIn = false;
const selectors = {
  vueContinueNo: 'div.modal.fade.show > div > div > div.modal-footer > button.btn.btn-outline-secondary.btn-rounded',
  vueFreeInput: '#useTextArea ~ label',
  vueLogin1: '#sign-in',
  vueLogin2: '#sign-in',
  vuePassword: '#password',
  vueRecoveryKey: '#mnemonicInput0',
  vueSwitch: '.theme-evan',
  vueUnlock: 'div.evan-steps.border-top.p-3 > div.pt-3.pb-3 > div > form > div.text-center > button',
};

Given("I log in to evan.network using vue with memonic {string} and password {string}", async (mnemonic, password) => {
  const evan = setupEvan(client);

  await client.url(`${ evan.baseUrl }#/dashboard.vue.evan`);
  await client.pause(5000);


  client.execute(function() {
    window.localStorage.setItem('evan-vault', '');
    window.localStorage.setItem('evan-test-mode', true);
    window.localStorage.setItem('evan-warnings-disabled', '{"payment-channel":true}');
    window.localStorage.setItem('evan-language', 'en');
    window.localStorage.setItem('evan-test-recaptchaId', '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI');
    return true;
  }, [], function(result) {
    this.assert.ok(result.value);
  });
})

Given(/^I log in to evan.network using vue( with )?(\w+)?$/, async (customPart, accountName) => {
  const evan = setupEvan(client);

  await client.url(`${ evan.baseUrl }#/dashboard.vue.evan`);
  await client.execute(function() {
    window.localStorage.setItem('evan-vault', '');
    window.localStorage.setItem('evan-test-mode', true);
    window.localStorage.setItem('evan-warnings-disabled', '{"payment-channel":true}');
    window.localStorage.setItem('evan-language', 'en');
    window.localStorage.setItem('evan-test-recaptchaId', '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI');
    return true;
  })

  if (customPart && !evan.accounts[accountName]) {
    throw new Error(`no account data found for account ${accountName}`);
  }
  const user = evan.accounts[accountName || 'default'];

  // vue, to define
  // click on the "sign in" link
  await client.waitForElementPresent(`a[href*="sign-in"]`, 60 * 1000);
  // need to wait because the link is initally overlayed
  await client.pause(500);
  await client.click(`a[href*="sign-in"]`)
  await client.waitForElementPresent(`#mnemonicInput0`, 5 * 1000);
  // fill the mnemonic words
  const splittedMnemnonic = user.mnemonic.split(' ');
  let count = 0;
  for(let value of splittedMnemnonic) {
    await client.setValue(`#mnemonicInput${count}`, value);
    count++;
  }
  client.useXpath();
  // click on the next button
  const nextBtnxPathSelector = `//*[contains(@class, 'btn') and normalize-space(text()) = "Next"]`;
  await client.click(nextBtnxPathSelector);

  // wait for profile loaded
  await client.pause(3000);

  const fieldSelector = [
    `//label[normalize-space(text()) = 'Password']/preceding-sibling::input`,
    `//label[normalize-space(text()) = 'Password']/following-sibling::input`,
    `//label/*[normalize-space(text()) = 'Password']/parent::*/preceding-sibling::input`,
    `//label/*[normalize-space(text()) = 'Password']/parent::*/following-sibling::input`
  ].join('|');


  await client.expect.element(fieldSelector).to.be.visible;
  await client.clearValue(fieldSelector),
  await client.setValue(fieldSelector, user.password);

  const unlockBtnxPathSelector = `//*[contains(@class, 'btn') and normalize-space(text()) = 'Unlock']`;
  await client.expect.element(unlockBtnxPathSelector).to.be.present;
  await client.click(unlockBtnxPathSelector);

  await client.pause(3000);

  const hasContinue = await new Promise((resolve) => {
    client.elements('css selector', selectors.vueContinueNo, result => resolve(!!result.value.length) ); } );
  if (hasContinue) {
    await client.click(selectors.vueContinueNo);
  }
  await client.pause(1000);

  loggedIn = true;
});


Given('I go to the evan.network startpage', async () => {
  const evan = setupEvan(client);

  await client.url(`${ evan.baseUrl }#/dashboard.vue.evan`);
  await client.execute(function() {
    window.localStorage.setItem('evan-language', 'en');
    window.localStorage.setItem('evan-test-recaptchaId', '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI');
    return true;
  });
  await client.pause(5000);
});

When(/I log out from vue/, async () => {
  const evan = setupEvan(client);

  if (loggedIn) {
    loggedIn = false;
    client.useCss();
    await client.url(`${ evan.baseUrl }#/dashboard.vue.evan`)
    await client.waitForElementPresent('#evan-dapp-profile', 10 * 1000)
    await client.click('#evan-dapp-profile')
    await client.waitForElementPresent(`#evan-logout`, 10 * 1000)
    await client.click('#evan-logout')
    await client.waitForElementPresent(`.modal-content #submit-logout`, 10 * 1000)
    await client.click('#submit-logout');
  }
});

Then(/I am no longer logged in to vue/, async () => {
  client.useCss();
  await client.waitForElementPresent('a[href*="sign-in"]', 30 * 1000);
  await client.assert.visible('a[href*="sign-in"]');
});

When(/I switch to vue/, async () => {
  const evan = setupEvan(client);

  await client.url(`${ evan.baseUrl }#/dashboard.vue.evan`);
  await client.waitForElementPresent('#dapp-home', 10 * 1000);
  await client.pause(2000);
});
