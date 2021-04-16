const e = require("express");
const express = require("express");
const server = express();
const movies = require("./movies.js");

const PORT = 3000;

//Create a handler to configure the middleware to serve this directory
const staticHandler = express.static("public");

server.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}..`));

//Create homepage route
server.get("/", (req, res) => {
  let posts = "";
  for (const movie of Object.keys(movies)) {
    posts += `<li>
      <a href="/search?movie=${movie}">${movie}</a>
      </li>`;
  }
 

//No search submitted show all movies
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Movie Review Blog!</title>
    </head>
    <body>
      <h1>Movie Review Blog!</h1>
      <form method="GET>
       <label id="search">Search Movie</label>
       <input id="search" name="search" placeholder="Insert movie name">
       <button>Search</button>
      <form>
      <ul>${posts}</ul>
      <p>If movie is not listed above, add it below</p>
      <label id="movie">Add Movie</label>
       <input id="movie" name="movie" placeholder="Add movie name">
       <button>Add</button>
    </body>
  </html>
  `;
  res.end(html);
  //   res.redirect("/details");
});
const bodyParser = express.urlencoded({ extended: false });

//Create movie
server.post("/", bodyParser, (req, res) => {
  const movieTitle = req.query.movieName;
  
  //const post = req.body;
  //const movieName = post.movieName;
  const movieObj = { movieTitle : [] };
  

  movies[movieTitle] = [];
 console.log({movieTitle});

  const search = req.query.movie || "";
  let posts = "";
  for (const movie of Object.keys(movies)) {
  posts += `<li>
    <a href="/search?movie=${movie}">${movie}</a>
    </li>`;
}

const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movie Review Blog!</title>
  </head>
  <body>
    <h1>Movie Review Blog!</h1>
    <form method="GET>
     <label id="search">Search Movie</label>
     <input id="search" name="search" placeholder="Insert movie name">
     <button>Search</button>
    <form>
    <ul>${posts}</ul>
    <p>If movie is not listed above, add it below</p>
    <label id="movieName">Add Movie</label>
     <input id="movieName" name="movieName" placeholder="Add movie name">
     <button>Add</button>
  </body>
</html>
`;
res.end(html);
});




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

  //If we don't have a search submission we show all movies
  const html = `
 <!doctype html>
 <html>
   <head>
     <meta charset="utf-8">
     <title>Movie Review Blog!</title>
   </head>
   <body>
       <h1>Add a Review!</h1>
       <form method="POST">
        <label id="movie"></label>
        <input id="movie-input" name="movie" value="${movie}" disabled>
        <label id="reviewer">Reviewer's Name</label>
        <input id="reviewer" name="reviewer">
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
 <html>
   <head>
     <meta charset="utf-8">
     <title>Movie Review Blog!</title>
   </head>
   <body>
       <h1>Add a Review!</h1>
       <form method="POST">
        <label id="reviewer">Reviewer's Name</label>
        <input id="reviewer" name="reviewer">
        <label id="post">Review</label>
        <input id="review" name="review" type="text" placeholder="Great movie">
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
