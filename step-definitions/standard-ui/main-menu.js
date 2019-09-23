import { client } from 'nightwatch-api';
import { When } from 'cucumber';

const mainMenu = {
  'Actions': '#evan-dapp-mailbox',
  'DApps': '#evan-dapp-favorites',
  'Digital Twins': '#evan-dapp-digitaltwins',
  'Explorer': '#evan-dapp-explorer',
  'Help': '#evan-dapp-help',
  'Profile': '#evan-dapp-profile',
  'Synchronization': '#evan-dapp-synchronization',
  'Verification Center': '#evan-dapp-verifications',
};

/**
 * Click on an entry within the sidepanel
 */
When('I click on {string} in main menu',
  async (entry) => {
    if (!mainMenu[entry]) {
      throw new Error('Could not find entry in main menu for: ', entry);
    } else {
      const selector = mainMenu[entry];

      // ensure that the element is present
      await client.expect.element(selector).to.be.present;

      // open it
      await client.click(selector);

      // wait a second after synchronization was opened, to be sure, that the animation has finished
      if (entry === 'Synchronization') {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
);