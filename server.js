// apiKey = 4b625c1a78f6443d95b9ec1947f3ff62

'use strict';

const express = require('express');
const pg = require('pg');
const fs = require('fs');
const bodyParser = require('body-parser');
const superagent = require('superagent');

const app = express();
const cors = require('cors');
const apiPrefix = 'https://newsapi.org/v2';
const apiKey = 'apiKey=181f3d6ba91f430b93b559021ceb725b';
const langCountry = 'language=en&country=us';
const pageSize = 10;
const PORT = process.env.PORT || 3000;


// const conString = 'postgres://ovidiuparasca:asdf1234@localhost:5432/newsflash';
// const client = new pg.Client(conString);
// client.connect();
// client.on('error', err => {
//   console.error(err);
// });

app.use(cors());
app.use(express.static('./public')); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles/:page/:sources?', (request, result, next) => {
  var articleSources = langCountry;
  if (request.params.sources) {
    articleSources = `sources=${request.params.sources}`;
  }
  let pagination = `pageSize=${pageSize}&page=${request.params.page}`;
  let articlesUrl = (`${apiPrefix}/top-headlines?${articleSources}&${pagination}&${apiKey}`);
  superagent.get(articlesUrl)
    .then(
      repos => {
        let data = JSON.parse(repos.text).articles;
        result.send(data);
      },
      err => result.send(err)
    ).catch(error => console.error(error));
});
  
app.get('/sources', (request, result) => {
  let sourcesUrl = (`${apiPrefix}/sources?${langCountry}&${apiKey}`);
  superagent.get(sourcesUrl)
  .then(
    repos => {
      let data = JSON.parse(repos.text).sources;
      result.send(data);
    },
      err => result.send(err)
    ).catch(error => console.error(error));
  });
  
  app.get('/hidden-api-key', (request, response) => {
  response.send(api);
});

app.listen(PORT, () => {
  console.log(`listening on PORT:  ${PORT}`);
});


