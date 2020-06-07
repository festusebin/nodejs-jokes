const request = require('request');
const fs = require('fs');

const searchTerm = process.argv[2];
console.log(searchTerm);
const options = {
  url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
  headers: {
    'User-Agent': 'request',
    Accept: 'application/json',
  },
};

request(options, (error, res, body) => {
  if (!error && res.statusCode == 200) {
    const jokes = JSON.parse(body).results;
    sendJoke(jokes);
  } else {
    console.log('Error', error);
  }
});

const sendJoke = (jokes) => {
  if (jokes.length !== 0) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    const joke = randomJoke.joke;
    fs.appendFile('joke.txt', joke + '\n', (err) {
      if (err) throw err;
      console.log('Joke Added');
    });
  } else {
    console.log('No joke matches this term');
  }
}
