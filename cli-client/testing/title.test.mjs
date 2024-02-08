import { expect } from 'chai';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

describe('Get title request', () => {
  describe('Successful request', () => {
    it('Should contain expected fields', async () => {
      const response = await exec('se2315 title --titleID tt0000929');

      expect(response.stdout).to.contain('titleID')
      expect(response.stdout).to.contain('type')
      expect(response.stdout).to.contain('originalTitle')
      expect(response.stdout).to.contain('titlePoster')
      expect(response.stdout).to.contain('startYear')
      expect(response.stdout).to.contain('endYear')
      expect(response.stdout).to.contain('genres')
      expect(response.stdout).to.contain('titleAkas')
      expect(response.stdout).to.contain('principals')
    })
    it('Should have the correct titleID', async () => {
      const response = await exec('se2315 title --titleID tt0000929');
      expect(response.stdout).to.contain('titleID: \'tt0000929\'')
    })
  })
  describe('Invalid title', () => {
    it('Should provide a message that the title is not found', async () => {
      const response = await exec('se2315 title --titleID tt0000');
      expect(response.stdout).to.equal('Error: { message: \'Title not found\' }\n')
    })
  })
  describe('Missing titleID param', () => {
    it('Should provide a message to provide the parameter', async () => {
      const response = await exec('se2315 title tt0000929');
      expect(response.stderr).to.equal('Please provide a title ID using --titleID.\n')
    })
  })
  describe('Missing titleID argument', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 title --titleID');
      } catch (error){
        expect(error.message).to.include('error: option \'-i, --titleID <titleID>\' argument missing')
      }
    })
  })
  describe('Missing format argument when format parameter is used', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 title --titleID tt0000929 --format');
      } catch (error){
        expect(error.message).to.include('error: option \'-f, --format <format>\' argument missing')
      }
    })
  })
})

