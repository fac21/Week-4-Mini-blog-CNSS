const e = require("express");
const express = require("express");
const server = express();
const movies = require("./movies.js");

const PORT = 3000;

// Create a handler to configure the middleware to serve this directory
const staticHandler = express.static("public");

server.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}..`));

// Create initial homepage route with no search submitted
server.get("/", (req, res) => {
  let posts = "";
  for (const movie of Object.keys(movies)) {
    posts += `<li>
      <a href="/search?movie=${movie}">${movie}</a>
      </li>`;
  }

  const html = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Movie blog">
      <link rel="stylesheet" type="text/css" href="style.css">
      <title>Movie Review Blog!</title>
    </head>
    <body>
      <h1>Movie Review Blog!</h1>
      <form method="POST" action="/search">
       <label id="search">Search Movie</label>
       <input id="search-input" name="search" placeholder="Insert movie name">
       <button>Search</button>
      </form>
      <ul>${posts}</ul>
      <p>If movie is not listed above, add it below</p>
      <form method="POST">
        <label id="addMovie">Add Movie</label>
       <input id="addMovie-input" name="addMovie" placeholder="Add movie name">
       <button>Add</button>
      </form>
    </body>
  </html>
  `;
  res.end(html);
});

const bodyParser = express.urlencoded({ extended: false });

// Search for a movie
server.post("/search", bodyParser, (req, res) => {
  console.log("hey why are you not running");
  console.log(req.body);
  res.redirect("/");
});

// Add a movie
server.post("/", bodyParser, (req, res) => {
  const newMovie = req.query.addMovie;
  movies[newMovie] = [];
  console.log(movies);
  console.log(newMovie);
  res.redirect("/");
});

// Search route where movies reviews are
server.get("/search", bodyParser, (req, res) => {
  const movie = req.query.movie;
  const search = req.query.movie || "";

  let posts = "";
  //Creates an array of reviews for the movie searched
  const reviews = movies[search];
  console.log(reviews);
  //If no reviews prompt to submit one 'Submit a review!'
  for (const review of reviews) {
    posts += `<li>${review.reviewer}, ${review.post}</li>`;
  }

  const html = `
 <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Movie blog">
      <link rel="stylesheet" type="text/css" href="style.css">
      <title>Movie Review Blog!</title>
    </head>
   <body>
       <h1>Add a Review!</h1>
       <form method="POST">
        <label id="movie"></label>
        <input id="movie-input" name="movie" value="${movie}" disabled>
        <label id="reviewer">Reviewer's Name</label>
        <input id="reviewer-input" name="reviewer">
        <label id="review">Review</label>
        <input id="review-input" name="review" type="text" placeholder="Great movie">
        <button id="post--btn">Post</button>
      </form>
     <ul>${posts}</ul>
   </body>
 </html>
 `;
  res.end(html);
});

// Add a movie review
server.post("/search", bodyParser, (req, res) => {
  const movieTitle = req.query.movie;
  const post = req.body;
  const reviewer = post.reviewer;
  const review = post.review;
  const blogObj = { reviewer: reviewer, post: review };

  movies[movieTitle].push(blogObj);

  const search = req.query.movie || "";
  let posts = "";
  //Creates an array of reviews for the movie searched
  const reviews = movies[search];
  //If no reviews prompt to submit one 'Submit a review!'
  if (!search) {
    posts += `<li>
    <a href="/search?movie=${movie}">${movie}</a>
    </li>`;
  }
  for (const review of reviews) {
    posts += `<li>${review.reviewer}, ${review.post}</li>`;
  }

  const html = `
 <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Movie blog">
      <link rel="stylesheet" type="text/css" href="style.css">
      <title>Movie Review Blog!</title>
    </head>
   <body>
       <h1>Add a Review!</h1>
       <form method="POST">
        <label id="reviewer">Reviewer's Name</label>
        <input id="reviewer-input" name="reviewer">
        <label id="review">Review</label>
        <input id="review-input" name="review" type="text" placeholder="Great movie">
        <button>Post</button>
      </form>
     <ul>${posts}</ul>
   </body>
 </html>
 `;
  res.end(html);
});

// Serve the public directory incl css file
server.use(staticHandler);
