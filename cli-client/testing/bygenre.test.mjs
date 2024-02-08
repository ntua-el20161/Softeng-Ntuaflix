import { expect } from 'chai';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

describe('Bygenre request', () => {
  describe('Successful request', () => {
    it('Should contain expected fields', async () => {
        const response = await exec('se2315 bygenre --genre Comedy --min 8');

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
  describe('Missing genre param', () => {
    it('Should provide a message to provide the parameter', async () => {
      const response = await exec('se2315 bygenre');

      expect(response.stderr).to.equal('Please provide a genre using --genre.\n')
    })
  })
  describe('Missing genre argument', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 bygenre --genre');
      } catch (error){
        expect(error.message).to.include('error: option \'-g, --genre <genre>\' argument missing')
      }
    })
  })
  describe('Invalid genre', () => {
    it('Should provide a message to provide a valid genre', async () => {
      const response = await exec('se2315 bygenre --genre someInvalidGenre --min 4.2');
      expect(response.stderr).to.equal('Error: { message: \'Please provide a valid genre\' }\n')
    })
  })
  describe('Missing rating param', () => {
    it('Should provide a message to provide the parameter', async () => {
      const response = await exec('se2315 bygenre --genre Comedy');

      expect(response.stderr).to.equal('Please provide a minimum rating using --min.\n')
    })
  })
  describe('Missing --min argument', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 bygenre --genre Comedy --min');
      } catch (error){
        expect(error.message).to.include('error: option \'-m, --min <min>\' argument missing')
      }
    })
  })
  describe('Min is not a number', () => {
    it('Should provide a message to provide a number', async () => {
      const response = await exec('se2315 bygenre --genre Comedy --min NotAnumber');
      expect(response.stderr).to.equal('Error: { message: \'Please provide a number as minRating\' }\n')
    })
  })
  describe('Missing format argument when format parameter is used', () => {
    it('Should provide a message that the argument is missing', async () => {
      let response
      try {
        response = await exec('se2315 bygenre --genre Comedy --min 8 --format');
      } catch (error){
        expect(error.message).to.include('error: option \'-f, --format <format>\' argument missing')
      }
    })
  })
})
