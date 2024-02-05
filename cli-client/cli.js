#!/usr/bin/env node

const program = require('commander');
const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');
const json2csv = require('json2csv').Parser

program
  .command('healthcheck')
  .description('Check the db connection status')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    try {

      const { format } = options;

      const response = await axios.get('http://localhost:9876/ntuaflix_api/admin/healthcheck', {
        params: { format }
      });

      
      console.log(response.data)
      
    } catch  {
      console.log(
        {
          status: 'failed',
          dataconnection: 'mongodb://127.0.0.1:27017/sample_data_softeng'
        }
      );
    }
  });

program
  .command('title')
  .description('Get information about a title by its ID')
  .option('-i, --titleID <titleID>', 'Specify the title ID')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    if (options.titleID) {
      try {
        const { titleID, format} = options;
        const response = await axios.get(`http://localhost:9876/ntuaflix_api/info/title/${titleID}`, {
          params: { format }
        });
        console.log(response.data)
      } catch (error) {
        console.error('Error:', error.response?.data);
      }
    } else {
      console.error('Please provide a title ID using --titleID.');
    }
  });

program
  .command('name')
  .description('Get information about a contributor by its ID')
  .option('-i, --nameID <nameID>', 'Specify the name ID')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    if (options.nameID) {
      try {
        const { nameID, format } = options;
        const response = await axios.get(`http://localhost:9876/ntuaflix_api/info/name/${nameID}`, {
          params: { format }
        });
        console.log(response.data)
      } catch (error) {
        console.error('Error:', error.response?.data);
      }
    } else {
      console.error('Please provide a name ID using --nameID.');
    }
  });

program
  .command('resetall')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    try {
      const { format } = options;
      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/resetall', {
        params: { format: format }
      });

      console.log(response.data)
    } catch (error) {
      console.error('Error:', error.response?.data);
    }
  });

program
  .command('newtitles')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    const { filename, format } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.basics.tsv', fileStream);

      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titlebasics', formData,  {
        params: { format },
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        }
      })
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('newakas')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    const { filename, format } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.akas.tsv', fileStream);

      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleakas', formData, {
        params: { format },
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('newnames')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    const { filename, format } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_name.basics.tsv', fileStream);

      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/upload/namebasics', formData, {
        params: { format },
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('newcrew')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    const { filename, format } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.crew.tsv', fileStream);

      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titlecrew', formData, {
        params: { format },
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('newepisode')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    const { filename, format } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.episode.tsv', fileStream);

      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleepisode', formData, {
        params: { format },
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('newprincipals')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    const { filename, format } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.principals.tsv', fileStream);

      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleprincipals', formData, {
        params: { format },
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('newratings')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    const { filename, format } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.ratings.tsv', fileStream);

      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleratings', formData, {
        params: { format },
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('searchname')
  .description('Search for names containing specified text')
  .option('-n, --name <name>', 'Specify the text to search for in names')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    try {
      const { name, format } = options;

      if (!name) {
        console.error('Please provide a namePart using --name.');
        return;
      }

      const response = await axios.get('http://localhost:9876/ntuaflix_api/searchname', {
        params: { namePart: name, format },
      });

      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('searchtitle')
  .description('Search for titles containing specified text')
  .option('-t, --titlepart <titlepart>', 'Specify the text to search for in titles')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    try {
      const { titlepart, format } = options;

      if (!titlepart) {
        console.error('Please provide a titlepart using --titlepart.');
        return;
      }

      const response = await axios.get('http://localhost:9876/ntuaflix_api/searchtitle', {
        params: { titlePart: titlepart, format },
      });

      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program
  .command('bygenre')
  .description('Get titles by genre and minimum rating')
  .requiredOption('-g, --genre <genre>', 'Specify the desired genre')
  .requiredOption('-m, --min <min>', 'Specify the minimum rating')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    try {
      const { genre, min, format } = options;

      if (!genre || !min) {
        console.error('Please provide both --genre and --min options.');
        return;
      }

      const response = await axios.get('http://localhost:9876/ntuaflix_api/clibygenre', {
        params: { qgenre: genre, minrating: min, format },
      });

      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data);
    }
  });

program.parse(process.argv);
