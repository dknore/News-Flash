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
let articleSources = '';
let page = 0;
const pageSize = 10;
const PORT = process.env.PORT || 3000;
// const conString = 'postgres://postgres:postgres@localhost:5432/booklist';
// const conString = 'postgress://localhost:5432';
// const conString = 'postgres://postgres:postgres@localhost:5432/booklist';
// const client = new pg.Client(conString);

// client.connect();
app.use(cors());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (request, result) => {
  if (articleSources.length == 0) {
    articleSources = langCountry;
  }
  let page = 0;
  let pagination = `pageSize=${pageSize}&page=${++page}`;
  let articlesUrl = (`${apiPrefix}/top-headlines?${articleSources}&${pagination}&${apiKey}`);
  superagent.get(articlesUrl)
    .then(
      // repos => result.send(JSON.parse(repos.text).sources),
      repos => {
        let data = JSON.parse(repos.text).articles;
        // console.log('data', data[0]);
        result.send(data);
      },
      err => result.send(err)
    ).catch(error => console.error(error));
});
  
app.get('/sources', (request, result) => {
  let sourcesUrl = (`${apiPrefix}/sources?${langCountry}&${apiKey}`);
  superagent.get(sourcesUrl)
  .then(
    // repos => result.send(JSON.parse(repos.text).sources),
    repos => {
      let data = JSON.parse(repos.text).sources;
      // console.log('data', data[0]);
      result.send(data);
      console.log('data', data);
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
