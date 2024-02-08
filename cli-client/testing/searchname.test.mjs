import { expect } from 'chai';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

describe('Search name request', () => {
    describe('Successful request', () => {
        it('Should contain expected fields', async () => {
            const response = await exec('se2315 searchname --name Federico');

            expect(response.stdout).to.contain('nameID')
            expect(response.stdout).to.contain('name')
            expect(response.stdout).to.contain('namePoster')
            expect(response.stdout).to.contain('birthYr')
            expect(response.stdout).to.contain('deathYr')
            expect(response.stdout).to.contain('profession')
            expect(response.stdout).to.contain('nameTitles')
        })
    })
    describe('Name not found', () => {
        it('Should provide a message that the name is not found', async () => {
        const response = await exec('se2315 searchname --name someNameThatShouldNotBeFound');
        expect(response.stderr).to.equal('Error: { message: \'No names found\' }\n')
        })
    })
    describe('Missing name param', () => {
        it('Should provide a message to provide the parameter', async () => {
        const response = await exec('se2315 searchname');

        expect(response.stderr).to.equal('Please provide a namePart using --name.\n')
        })
    })
    describe('Missing name argument', () => {
        it('Should provide a message that the argument is missing', async () => {
        let response
        try {
            response = await exec('se2315 searchname --name');
        } catch (error){
            expect(error.message).to.include('error: option \'-n, --name <name>\' argument missing')
        }
        })
    })
    describe('Missing format argument when format parameter is used', () => {
        it('Should provide a message that the argument is missing', async () => {
        let response
        try {
            response = await exec('se2315 searchname --name Federico --format');
        } catch (error){
            expect(error.message).to.include('error: option \'-f, --format <format>\' argument missing')
        }
        })
    })
})
