import { expect } from 'chai';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

describe('Search title request', () => {
  describe('Successful request', () => {
    it('Should contain expected fields', async () => {
        const response = await exec('se2315 searchtitle --titlepart Monster');

        expect(response.stdout).to.contain('titleID');
        expect(response.stdout).to.contain('type');
        expect(response.stdout).to.contain('originalTitle')
        expect(response.stdout).to.contain('titlePoster')
        expect(response.stdout).to.contain('startYear')
        expect(response.stdout).to.contain('endYear')
        expect(response.stdout).to.contain('genres')
        expect(response.stdout).to.contain('titleAkas')
        expect(response.stdout).to.contain('principals')
        expect(response.stdout).to.contain('rating')
      })
  })
  describe('Title not found', () => {
    it('Should provide a message that the title is not found', async () => {
      const response = await exec('se2315 searchtitle --titlepart someTitleThatShouldNotBeFound');
      expect(response.stderr).to.equal('Error: { message: \'No titles found\' }\n')
    })
  })
  describe('Missing titlepart param', () => {
    it('Should provide a message to provide the parameter', async () => {
      const response = await exec('se2315 searchtitle');

      expect(response.stderr).to.equal('Please provide a titlepart using --titlepart.\n')
    })
  })
  describe('Missing titlepart argument', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 searchtitle --titlepart');
      } catch (error){
        expect(error.message).to.include('error: option \'-t, --titlepart <titlepart>\' argument missing')
      }
    })
  })
  describe('Missing format argument when format parameter is used', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 searchtitle --titlepart mo --format');
      } catch (error){
        expect(error.message).to.include('error: option \'-f, --format <format>\' argument missing')
      }
    })
  })
})
