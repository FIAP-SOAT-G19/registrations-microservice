const { Given, When, Then } = require('@cucumber/cucumber');
const { CreateEmployeeController } = require('../../dist/infra/adapters/controllers/employee/create-employee.controller');
const chai = require('chai');
const expect = chai.expect;

let controller;
let response;
let requestData;

class CreateEmployeeUseCaseMock {
  async execute(data) {
    return 'mock-employee-id';
  }
}

Given('I have a valid employee data', function () {
  requestData = {
    name: 'Test Employee',
    email: 'test@employee.com',
    cpf: '123.456.789-00',
    password: 'testpassword',
  };
  controller = new CreateEmployeeController(new CreateEmployeeUseCaseMock());
});

When('I send a POST request to {string} with the employee data', async function (path) {
  const httpRequest = {
    body: requestData,
    path,
    method: 'POST',
  };
  response = await controller.execute(httpRequest);
});

Then('I should receive a {int} status code and the employee ID', function (statusCode) {
  expect(response.statusCode).to.equal(statusCode);
  expect(response.body.idEmployee).to.equal('mock-employee-id');
});
