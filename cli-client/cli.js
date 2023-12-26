#!/usr/bin/node

const program = require('commander');
const axios = require('axios').default;

program
  .command('healthcheck')
  .description('Check the health status of the backend')
  .action(async () => {
    try {
      const response = await axios.get('http://localhost:9876/ntuaflix_api/admin/healthcheck');
      
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

program.parse(process.argv);
