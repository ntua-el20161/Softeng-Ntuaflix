#!/usr/bin/node

const program = require('commander');
const axios = require('axios').default;
const fs = require('fs');
const FormData = require('form-data');

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

program
  .command('title')
  .description('Get information about a title by its ID')
  .option('-i, --titleID <titleID>', 'Specify the title ID')
  .action(async (options) => {
    if (options.titleID) {
      try {
        const response = await axios.get(`http://localhost:9876/ntuaflix_api/info/title/${options.titleID}`);
        console.log('Title Information:', response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.error('Please provide a title ID using --titleID.');
    }
  });

program
  .command('name')
  .description('Get information about a contributor by its ID')
  .option('-i, --nameID <nameID>', 'Specify the name ID')
  .action(async (options) => {
    if (options.nameID) {
      try {
        const response = await axios.get(`http://localhost:9876/ntuaflix_api/info/name/${options.nameID}`);
        console.log('Contributor Information:', response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.error('Please provide a name ID using --nameID.');
    }
  });

// #testing for body with get/post request
// program
// .command('post')
// .option('-t, --name <name>', 'Desired name')
// .action(async (options) => {
//   if (options.name) {
//     try {
//       const requestBody = JSON.stringify({ name: options.name });
//       console.log('Request Body:', requestBody);
//       const response = await axios.post('http://localhost:9876/ntuaflix_api', requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('Status:', response.status);
//       console.log('Search Results:', response.data);
//     } catch (error) {
//       console.error('Error Status:', error.response ? error.response.status : 'Unknown');
//       console.error('Error:', error.message);
//     }
//   } else {
//     console.error('Please provide a name using --name.');
//   }
// });

program
  .command('resetall')
  .action(async () => {
    try {
      const response = await axios.post('http://localhost:9876/ntuaflix_api/admin/resetall');

      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

program
  .command('newtitles')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .action((options) => {
    const { filename } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.basics.tsv', fileStream);

      axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titlebasics', formData, {
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
        .then((response) => {
          console.log('Server Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    } catch (error) {
      console.error('Error reading the file:', error.message);
    }
  });

program
  .command('newakas')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .action((options) => {
    const { filename } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.akas.tsv', fileStream);

      axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleakas', formData, {
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
        .then((response) => {
          console.log('Server Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    } catch (error) {
      console.error('Error reading the file:', error.message);
    }
  });

program
  .command('newnames')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .action((options) => {
    const { filename } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_name.basics.tsv', fileStream);

      axios.post('http://localhost:9876/ntuaflix_api/admin/upload/namebasics', formData, {
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
        .then((response) => {
          console.log('Server Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    } catch (error) {
      console.error('Error reading the file:', error.message);
    }
  });

program
  .command('newcrew')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .action((options) => {
    const { filename } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.crew.tsv', fileStream);

      axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titlecrew', formData, {
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
        .then((response) => {
          console.log('Server Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    } catch (error) {
      console.error('Error reading the file:', error.message);
    }
  });

program
  .command('newepisode')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .action((options) => {
    const { filename } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.episode.tsv', fileStream);

      axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleepisode', formData, {
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
        .then((response) => {
          console.log('Server Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    } catch (error) {
      console.error('Error reading the file:', error.message);
    }
  });

program
  .command('newprincipals')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .action((options) => {
    const { filename } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.principals.tsv', fileStream);

      axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleprincipals', formData, {
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
        .then((response) => {
          console.log('Server Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    } catch (error) {
      console.error('Error reading the file:', error.message);
    }
  });

program
  .command('newratings')
  .option('-f, --filename <filename>', 'Specify the name of the CSV file')
  .action((options) => {
    const { filename } = options;

    if (!filename) {
      console.error('Please provide a filename using --filename.');
      process.exit(1);
    }

    try {
      const fileStream = fs.createReadStream(filename);
      const formData = new FormData();
      formData.append('truncated_title.ratings.tsv', fileStream);

      axios.post('http://localhost:9876/ntuaflix_api/admin/upload/titleratings', formData, {
        headers: {
          ...formData.getHeaders(), // Important for multipart form data
        },
      })
        .then((response) => {
          console.log('Server Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    } catch (error) {
      console.error('Error reading the file:', error.message);
    }
  });

program
  .command('searchname')
  .description('Search for names containing specified text')
  .option('-t, --namePart <namePart>', 'Specify the text to search for in names')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    try {
      const { titlePart, format } = options;

      if (!titlePart) {
        console.error('Please provide a namePart using --namePart.');
        return;
      }

      const response = await axios.get('http://localhost:9876/ntuaflix_api/searchname', {
        params: { namePart: titlePart, format },
      });

      if (format === 'json') {
        console.log('Search Results:', response.data);
      } else {
        console.log('CSV Output:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

program
  .command('searchtitle')
  .description('Search for titles containing specified text')
  .option('-t, --titlePart <titlePart>', 'Specify the text to search for in titles')
  .option('-f, --format <format>', 'Specify the output format (json or csv)', /^(json|csv)$/i, 'json')
  .action(async (options) => {
    try {
      const { titlePart, format } = options;

      if (!titlePart) {
        console.error('Please provide a titlePart using --titlePart.');
        return;
      }

      const response = await axios.get('http://localhost:9876/ntuaflix_api/searchtitle', {
        params: { namePart: titlePart, format },
      });

      if (format === 'json') {
        console.log('Search Results:', response.data);
      } else {
        console.log('CSV Output:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

program.parse(process.argv);
