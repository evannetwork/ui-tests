import { client } from 'nightwatch-api';
import { Given, When, Then, setDefinitionFunctionWrapper, Tag } from 'cucumber';

/************************************** Fill the formular *****************************************/
When(/I fill test data into the request verification modal/,
  async () => {
    await client.setValue(`input[placeholder*="Organization name"]`, 'evan GmbH');
    await client.setValue(`input[placeholder*="Company headquarters country"]`, 'germany');
    await client.setValue(`input[placeholder*="Where is the company registered?"]`, 'Amtsgericht Erfurt');
    await client.setValue(`input[placeholder*="Type of register"]`, 'HRB');
    await client.setValue(`input[placeholder*="98765"]`, '98765');
    await client.setValue(`input[placeholder*="Enter address"]`, 'Johannisplatz 16');
    await client.setValue(`input[placeholder*="Postcode"]`, '99817');
    await client.setValue(`input[placeholder*="City"]`, 'Eisenach');
    await client.setValue(`input[placeholder*="Enter contact name"]`, 'Test Contact');
    await client.setValue(`input[placeholder*="Department"]`, 'Test Department');
  }
)
