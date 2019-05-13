import { client } from 'nightwatch-api';
import { Given, When, Then } from 'cucumber';

import { setupEvan } from '../../test-utils/angular.js';
import { backspaces, pauseHere, switchToVue } from '../../test-utils/test-utils.js';


const evan = setupEvan(client);

const selectors = {
  loading: '#dropdown-queue.running',
  loadingDone: '#dropdown-queue.finished',
  mainMenu: {
    digitalTwinsButton: '#evan-dapp-digitaltwins',
  },
  container: {
    edit: {
      addDataSet: '#th-entry-add-show',
      dataSet: {
        edit: {
          addButton: '#th-add-entry',
          createConfirmButton: '#container-create-question #container-create',
          editButton: '#entry-edit',
          fieldName: (i) => `#ajv-name-${ i } input`,
          fieldValue: (i) => `#ajv-value-${ i } input`,
          finishButton: '#container-save',
          firstTab: 'th-entries > div:first-child',
          name: '#name',
          schemaApply: '#entry-save',
          typeOption: {
            Metadata: '#type > option[value="object"]',
            List: '#type > option[value="array"]',
            Text: '#type > option[value="string"]',
            Number: '#type > option[value="number"]',
          },
          typeSelect: '#type',
          useSchema: '#entry-save',
          value: '#value',
        },
        view: {
          fieldName: (i) => `#ajv-name-${ i } span`,
          fieldValue: (i) => `#ajv-value-${ i } span`,
          fieldValueSingle: '#value',
        },
      },
      description: '#description',
      name: '#name',
      saveButton: '#container-save',
      spinner: '.evan-loading',
      step1Button: '#container-create-step-0-finish',
    },
  },
  twins: {
    backButton: 'div.dapp-wrapper-body.show-sidebar-2 > div.dapp-wrapper-sidebar-2 > div > div > div > button',
    createButton: '#dt-create',
    createContainerButton: '#dt-container-create',
    edit: {
      description: '#dt-general-form #description',
      name: '#dt-general-form #name',
      saveButton: '#dt-save',
      submitButton: '#dt-create',
    },
    favoriteTwins: '#evan-dt-favorites > div > a h4',
    firstTwin: '#evan-dt-favorites > div:first-child > a',
    view: {
      generalInformation: '#evan-dt-nav-general',
      twinData: '#evan-dt-nav-digitaltwin-details',
    },
  },
};

// atm not in use but keep it for custom js based selectors
// const createUniqueSelector = async (finder) => {
//   return new Promise((resolve) => {
//     client.execute(
//       function(finderString){
//         const found = (new Function('return ' + finderString)())()
//         const now = Date.now();
//         found.className += now;
//         return now;
//       }, [finder.toString()], (result) => {
//         resolve(`.${result.value}`);
//       });
//   }); 
// };
// const test = await createUniqueSelector(function() {
//   const firstDiv = document.querySelectorAll('div')[0];
//   return firstDiv;
// });
// console.dir(test);

const waitForSyncFinished = async (preLoading = 300000, loading = 300000) => {
  await client.waitForElementPresent(selectors.loading, preLoading);
  await client.waitForElementPresent(selectors.loadingDone, loading);
};

When(/^I create a new digital twin with the name "([^"]+)" and the description "([^"]+)"$/,
  async (name, description) => {
    await client.url(`${ evan.baseUrl }#/dashboard.evan/digitaltwins.evan/overview`);
    await client.waitForElementPresent(selectors.twins.createButton, 10000);
    await client.click(selectors.twins.createButton);
    // fill in twin data
    await client.waitForElementPresent(selectors.twins.edit.submitButton, 10000);
    await client.waitForElementPresent(selectors.twins.edit.name, 10000);
    await client.setValue(selectors.twins.edit.name, [backspaces(20), name]);
    await client.setValue(selectors.twins.edit.description, description);
    await client.click(selectors.twins.edit.submitButton);
    // wait for completion (first let current save button fade away)
    await client.pause(1000);
    await client.waitForElementPresent(selectors.twins.edit.saveButton, 60000);
    await client.pause(1000);
    // go back
    await client.waitForElementPresent(selectors.twins.backButton, 10e3);
    await client.click(selectors.twins.backButton);
    await client.waitForElementPresent(selectors.twins.createButton, 10e3);
  },
);

When(/^I add a container with the name "([^"]+)" and the description "([^"]+)"$/,
  async (name, description) => {
    await client.waitForElementPresent(selectors.twins.createContainerButton, 10000);
    await client.click(selectors.twins.createContainerButton);
    await client.waitForElementPresent(selectors.container.edit.step1Button, 10000);
    await client.waitForElementPresent(selectors.container.edit.name, 10000);
    await client.setValue(selectors.container.edit.name, [backspaces(20), name]);
    await client.setValue(selectors.container.edit.description, description);
    await client.click(selectors.container.edit.step1Button);
    await client.waitForElementPresent(selectors.container.edit.saveButton, 60000);
    await client.pause(1000);
  },
);

When(/^I add a data set with the type "(([^"]+))", the name "([^"]+)" and the value "([^"]+)"$/,
  async (type, name, value) => {
    // start
    await client.click(selectors.container.edit.addDataSet);

    // select type
    await client.click(selectors.container.edit.dataSet.edit.typeSelect);
    await client.click(selectors.container.edit.dataSet.edit.typeOption[type]);

    // enter name and confirm
    await client.setValue(selectors.container.edit.dataSet.edit.name, [backspaces(20), name]);
    await client.waitForElementPresent(selectors.container.edit.dataSet.edit.addButton, 10000);
    await client.click(selectors.container.edit.dataSet.edit.addButton);

    // enter value
    switch (type) {
      case 'Metadata': {
        await client.click('.ajv-add-overlay');
        await client.pause(1000);
        const [ field0, value0 ] = value.split(':');
        await client.waitForElementPresent(selectors.container.edit.dataSet.edit.fieldName(0), 10000);
        await client.setValue(selectors.container.edit.dataSet.edit.fieldName(0), field0);
        await client.click(selectors.container.edit.dataSet.edit.useSchema);
        await client.waitForElementPresent(selectors.container.edit.dataSet.edit.fieldValue(0), 10000);
        await client.setValue(selectors.container.edit.dataSet.edit.fieldValue(0), value0);
        break;
      }
      case 'Text':
      case 'Number': {
        // await client.click(selectors.container.edit.dataSet.edit.editButton);
        // await client.pause(1000);
        await client.setValue(selectors.container.edit.dataSet.edit.value, value);
        break;
      }
      case 'List':
      default: throw new Error(`unknown type: ${type}`);
    } 

    await client.click(selectors.container.edit.dataSet.edit.schemaApply);
    await client.pause(1000);
    await client.click(selectors.container.edit.dataSet.edit.finishButton);
    await client.waitForElementPresent(selectors.container.edit.dataSet.edit.createConfirmButton, 10000);
    await client.click(selectors.container.edit.dataSet.edit.createConfirmButton);

    await client.waitForElementPresent(selectors.container.edit.spinner, 10000);
    await client.waitForElementPresent(selectors.container.edit.saveButton, 120000);
  },
);


// requires "When(/^I create a new digital twin with the name..." beforehand
// as selection on twin with a specific name is tricky and anonymous browser does not keep order of last twins
Then(/^I can open the last twin$/, async () => {
  // open description of given twin
  await client.click(selectors.mainMenu.digitalTwinsButton);
  await client.waitForElementPresent(selectors.twins.favoriteTwins, 10000);
  await client.click(selectors.twins.firstTwin);
  await client.waitForElementPresent(selectors.twins.view.twinData, 10000);
});

Then(/^I can see that the twin name is "([^"]+)" and the description is "([^"]+)"$/, async (name, description) => {
  await client.click(selectors.twins.view.twinData);
  await client.pause(1000);
  await client.waitForElementPresent(selectors.twins.view.generalInformation, 10000);
  await client.click(selectors.twins.view.generalInformation);

  await client.waitForElementPresent(selectors.twins.edit.name, 10000);
  await client.expect.element(selectors.twins.edit.name).value.to.equal(name);
  await client.expect.element(selectors.twins.edit.description).value.to.equal(description);
});

Then(/^I can see that the first property has a key named "([^"]+)" and a value of "([^"]+)"$/, async (name, value) => {
  await client.pause(1000);
  await client.expect.element(selectors.container.edit.dataSet.view.fieldName(0)).text.to.equal(name);
  await client.expect.element(selectors.container.edit.dataSet.view.fieldValue(0)).text.to.equal(value);
});

Then(/^I can see that the value is "([^"]+)"$/, async (value) => {
  await client.pause(1000);
  await client.expect.element(selectors.container.edit.dataSet.view.fieldValueSingle).text.to.equal(value);
});