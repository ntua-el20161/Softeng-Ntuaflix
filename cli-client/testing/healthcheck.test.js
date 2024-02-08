const { exec } = require('child_process');

// Mocking axios for the test
jest.mock('axios');

const axios = require('axios');

describe('Healthcheck Command', () => {
  test('should return healthcheck data in JSON format', async () => {
    const result = await executeHealthcheckCommand('--format json');
    expect(result).toEqual(
      {    
        status: 'OK',
        dataconnection: 'mongodb://127.0.0.1:27017/sample_data_softeng' 
      }
    );
  });

  test('should handle failed healthcheck and return default data', async () => {
    axios.get.mockRejectedValue(new Error('Failed to connect'));

    const result = await executeHealthcheckCommand('--format json');

    expect(result).toEqual({
      status: 'failed',
      dataconnection: 'mongodb://127.0.0.1:27017/sample_data_softeng'
    });
  });
});

function executeHealthcheckCommand(options) {
  return new Promise((resolve, reject) => {
    exec(`se2315 healthcheck ${options}`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(JSON.parse(stdout));
      }
    });
  });
}