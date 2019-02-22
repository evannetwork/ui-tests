/*
  Copyright (C) 2018-present evan GmbH.

  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3,
  as published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program. If not, see http://www.gnu.org/licenses/ or
  write to the Free Software Foundation, Inc., 51 Franklin Street,
  Fifth Floor, Boston, MA, 02110-1301 USA, or download the license from
  the following URL: https://evan.network/license/

  You can be released from the requirements of the GNU Affero General Public
  License by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts
  of it on other blockchains than evan.network.

  For more information, please contact evan GmbH at this address:
  https://evan.network/license/
*/

const evan = {
  /**
   * Login to the browser using an mnemonic and password.
   *
   * @param      {any}  browser   nightwatch browser instance
   * @param      {string}  mnemonic  12 word mnemonic seeed
   * @param      {string}  password  password th unlock the account
   * @return     {any}     nightwatch browser result chain
   */
  login: function(browser, mnemonic, password) {
    return browser
      .url(this.url)
      .execute(function() {
        window.localStorage['bc-dev-logs'] = 'debug';
        window.localStorage['angular-dev-logs'] = 'debug';
      }, [], function(result) {})
      .waitForElementVisible('onboarding-welcome', 30000)
      .assert.elementPresent('.slide-zoom > h3')
      .click('.start-buttons > button:nth-child(2)')
      .waitForElementVisible('mnemonic-display', 10000)
      .click('mnemonic-display ion-toggle')
      .setValue('.direct-input ion-textarea > textarea', [mnemonic, browser.Keys.ENTER])
      .waitForElementVisible('.password-dialog', 10000)
      .setValue('.password-dialog ion-input > input', [password, browser.Keys.ENTER])
      .pause(3000);
  },
  /**
   * Login to the browser using an mnemonic and password.
   *
   * @param      {any}  browser   nightwatch browser instance
   * @param      {string}  mnemonic  12 word mnemonic seeed
   * @param      {string}  password  password th unlock the account
   * @return     {any}     nightwatch browser result chain
   */
  logout: function(browser, mnemonic, password) {
    return browser
      .url(`${ this.url }#/profile.evan`)
      .waitForElementPresent('evan-profile-detail .evan-content button.button-outline-md-alert', 10 * 1000)
      .click('evan-profile-detail .evan-content button.button-outline-md-alert')
      .waitForElementPresent(`ion-alert .alert-button-group button:nth-child(2)`, 10 * 1000)
      .click(`ion-alert .alert-button-group button:nth-child(2)`)
      .pause(3000);
  },
  /**
   * Small wrapper around browser visible and set value, to be sure that a element is visbile and we
   * can directly set an value.
   *
   * @param      {any}     browser   nightwatch browser instance
   * @param      {string}  selector  element selector
   * @param      {any}     setValue  set value args
   * @return     {any}     nightwatch browser result chain
   */
  selectContractMember: function(browser, compSelector, menuSelector, contactName) {
    return browser
      .click(`${ compSelector } input`)
      .waitForElementVisible(`${ menuSelector }`, 10000)
      // search for contract members
      .setValue(`${ menuSelector } input[placeholder="Suche Kontakte, um sie hinzuzufügen..."]`, contactName)
      .waitForElementVisible(`${ menuSelector } ion-list ion-item`, 10000)
      // select the searched user
      .click(`${ menuSelector } ion-list ion-item`)
      // close the contract members
      .click(`${ menuSelector } ion-header ion-buttons.bar-buttons button`);
  },

  /**
   * Wait for the queue to be finished.
   *
   * @param      {any}  browser  nightwatch browser instance
   * @return     {any}  nightwatch browser result chain
   */
  syncFinished: function(browser) {
    return browser
      .waitForElementVisible('.toast-message', 120 * 1000)
      .assert.containsText('.toast-message', 'Synchronization finished')
      .waitForElementNotPresent('.toast-message', 10000)
  }
};

/**
 * Sets the default evan configuration parameters for the test.
 *
 * @param      {any}  browser  the nightwatch browser instance.
 * @param      {any}  customs  custom properties that should be added to the evan context
 */
exports.setupEvan = function(browser, customs) {
  const merged = Object.assign({ }, evan, customs, browser.options.globals);

  // bind all the functions to the browser context
  Object.keys(merged).forEach(funcName => {
    if (typeof merged[funcName] === 'function') {
      merged[funcName] = merged[funcName].bind(merged, browser);
    }
  });

  // fix event listener maximum:
  //    MaxListenersExceededWarning: Possible EventEmitter memory leak
  //    detected. 11 error listeners added. Use emitter.setMaxListeners() to increase limit
  require('events').EventEmitter.defaultMaxListeners = 100;

  browser.evan = merged;
}