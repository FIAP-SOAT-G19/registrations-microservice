const { Given, When, Then } = require('@cucumber/cucumber');
const { CreateClientController } = require('../../dist/infra/adapters/controllers/client/create-client.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class CreateClientUseCaseMock {
  async execute(data) {
    return 'mock-client-id';
  }
}

Given('I have a valid client data', function () {
  requestData = {
    name: 'Test Client',
    email: 'test@client.com',
  };
  controller = new CreateClientController(new CreateClientUseCaseMock());
});

When('I send a POST request to {string} with the client data', async function (path) {
  const httpRequest = {
    body: requestData,
    path,
    method: 'POST',
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the client ID', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body.clientId).to.equal('mock-client-id');
});
