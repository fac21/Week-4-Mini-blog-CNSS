//Imports
const express = require("express");
const server = express();
const movies = require("./movies.js");

//Static Files
server.use("/public", express.static("public"));

const PORT = 3000;

// Create a handler to configure the middleware to serve this directory
const staticHandler = express.static("public");

server.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}..`));

// create homepage routes
server.get("/", (req, res) => {
  let posts = "";
  for (const movie of Object.keys(movies)) {
    posts += `<li>
      <a href="/search?movie=${movie}">${movie}</a>
      </li>`;
  }

  // if we don't have a search submission we show all movies
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel ="stylesheet" type ="text/css" href ="./public/style.css" />
      <title>Movie Review Blog!</title>
    </head>
    <body>
    <section>
    <h1>Movie Review Blog!</h1>
      <form method="GET" class="center">
       <label id="movie">Movie</label>
       <input id="movie" name="movie" placeholder="mixer..">
       <button class="search--btn">Search</button>
      </form>
      <aside class="movie-review-list">
      <ul>${posts}</ul>
      </aside>
      </section>
    </body>
  </html>
  `;
  res.end(html);
  //   res.redirect("/details");
});

server.get("/search", (req, res) => {
  const movie = req.query.movie;
  const search = req.query.movie || "";

  let posts = "";
  //Creates an array of reviews for the movie searched
  const reviews = movies[search];
  //If no reviews prompt to submit one 'Submit a review!'
  for (const review of reviews) {
    posts += `<li>${review.reviewer}, ${review.post}</li>`;
  }

  //If we don't have a search submission we show all movies
  const html = `
 <!doctype html>
 <html>
   <head>
     <meta charset="utf-8">
     <link rel ="stylesheet" type ="text/css" href ="./public/style.css" />
     <title>Movie Review Blog!</title>
   </head>
   <body>
   <section>
       <h1>Add a Review!</h1>
       <form method="POST" class="center">
        <label id="movie"></label>
        <input id="movie-input" name="movie" value="${movie}" disabled class="hidden">
        <label id="reviewer">Reviewer's Name</label>
        <input id="reviewer-input" name="reviewer" placeholder="Your name...">
        <label id="review">Review</label>
        <input id="review-input" name="review" type="text" placeholder="Your thoughts...">
        <button class="post--btn">Post</button>
      </form>
      <aside class="movie-review-list">
      <ul>${posts}</ul>
      </aside>
      </section>
   </body>
 </html>
 `;
  res.end(html);
});

// add movie
const bodyParser = express.urlencoded({ extended: false });

server.post("/search", bodyParser, (req, res) => {
  const movieTitle = req.query.movie;
  const post = req.body;
  const reviewer = post.reviewer;
  const review = post.review;
  const blogObj = { reviewer: review, post: review };

  movies[movieTitle].push(blogObj);

  const search = req.query.movie || "";
  let posts = "";
  //Creates an array of reviews for the movie searched
  const reviews = movies[search];
  //If no reviews prompt to submit one 'Submit a review!'
  for (const review of reviews) {
    posts += `<li>${review.reviewer}, ${review.post}</li>`;
  }

  const html = `
 <!doctype html>
 <html>
   <head>
     <meta charset="utf-8">
     <link rel ="stylesheet" type ="text/css" href ="./public/style.css" />
     <title>Movie Review Blog!</title>
   </head>
   <body>
       <h1>Add a Review!</h1>
       <form method="POST" class="center">
        <label id="reviewer">Reviewer's Name</label>
        <input id="reviewer-input" name="reviewer" placeholder="Your name...">
        <label id="post">Review</label>
        <input id="review" name="review" type="text" placeholder="Your thoughts...">
        <button class="post--btn">Post</button>
      </form>
      <aside class="movie-review-list">
      <ul>${posts}</ul>
      </aside>
   </body>
 </html>
 `;
  res.end(html);
});

// Serve the public directory incl css file
server.use(staticHandler);
