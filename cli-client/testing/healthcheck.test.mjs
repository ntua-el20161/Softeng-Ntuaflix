import { expect } from 'chai';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

describe('Healthcheck request', () => {
  describe('Successful request', () => {
    it('Should contain expected content', async () => {
      const response = await exec('se2315 healthcheck');

      expect(response.stdout).to.include('status: \'OK\'')
      expect(response.stdout).to.include('dataconnection: \'mongodb://127.0.0.1:27017/sample_data_softeng\'')
    })
  })
  describe('Missing format argument when format parameter is used', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 healthcheck --format');
      } catch (error){
        expect(error.message).to.include('error: option \'-f, --format <format>\' argument missing')
      }
    })
  })
})

