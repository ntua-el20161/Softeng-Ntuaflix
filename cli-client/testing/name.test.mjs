import { expect } from 'chai';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

describe('Get name request', () => {
  describe('Successful request', () => {
    it('Should contain expected fields', async () => {
      const response = await exec('se2315 name --nameid nm0000019');

      expect(response.stdout).to.contain('nameID')
      expect(response.stdout).to.contain('name')
      expect(response.stdout).to.contain('namePoster')
      expect(response.stdout).to.contain('birthYr')
      expect(response.stdout).to.contain('deathYr')
      expect(response.stdout).to.contain('profession')
      expect(response.stdout).to.contain('nameTitles')
    })
    it('Should have the correct nameID', async () => {
      const response = await exec('se2315 name --nameid nm0000019');
      expect(response.stdout).to.contain('nameID: \'nm0000019\'')
    })
  })
  describe('Invalid name', () => {
    it('Should provide a message that the name is not found', async () => {
      const response = await exec('se2315 name --nameid nm0000');
      expect(response.stderr).to.equal('Error: { message: \'Name not found\' }\n')
    })
  })
  describe('Missing nameid param', () => {
    it('Should provide a message to provide the parameter', async () => {
      const response = await exec('se2315 name nm0000019');
      expect(response.stderr).to.equal('Please provide a name ID using --nameid.\n')
    })
  })
  describe('Missing nameid argument', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 name --nameid');
      } catch (error){
        expect(error.message).to.include('error: option \'-i, --nameid <nameid>\' argument missing')
      }
    })
  })
  describe('Missing format argument when format parameter is used', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 name --nameid nm0000019 --format');
      } catch (error){
        expect(error.message).to.include('error: option \'-f, --format <format>\' argument missing')
      }
    })
  })
})

