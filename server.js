const express = require("express");
const server = express();
const movies = require("./movies.js");

const PORT = 3000;

// Create a handler to configure the middleware to serve this directory
const staticHandler = express.static("public");

server.listen(PORT, () => console.log(`Listen on http://localhost:${PORT}..`));

// create homepage route
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
      <title>Movie Review Blog!</title>
    </head>
    <body>
        <h1>Movie Review Blog!</h1>
        //ADD FORM
      <ul>${posts}</ul>
    </body>
  </html>
  `;
  res.end(html);
  //   res.redirect("/details");
});

server.get("/search", (req, res) => {
  const search = req.query.movie || "";
  console.log(search);
  let posts = "";
  //Creates an array of reviews for a movie.
  const reviews = movies[search];
  console.log(typeof reviews);
  //if not reviews 'Hey you need to submit a review'
  for (const review of reviews) {
    posts += `<li>${review.reviewer}, ${review.post}</li>`;
  }

  // if we don't have a search submission we show all movies
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Movie Review Blog!</title>
      </head>
      <body>
          <h1>Movie Review Blog!</h1>
        <ul>${posts}</ul>
      </body>
    </html>
    `;
  res.end(html);
});

// server.post("/", (req, res) => {
//   const search = req.query.search || "";
//   console.log(search);
//   let posts = "";
//   movies.forEach((movie) => {
//     for (const movie of Object.values(movies)) {
//       const match = movie.reviewer.toLowerCase().includes(search.toLowerCase());
//       console.log(match);
//       // if we don't have a search submission we show all movies
//       if (match || !search) {
//         posts += `<li>${movie.reviewer}</li>`;
//       }
//     }
//     console.log(posts);
//   });

//   const html = `
//   <!doctype html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <title>Dogs!</title>
//     </head>
//     <body>
//         <h1>Movie Review Blog!</h1>
//          <form method="POST">
//         <label id="search">Search movies</label>
//         <input id="search" type="search" name="search" placeholder="E.g. superman">
//         <button>Search</button>
//         </form>
//       <ul>${posts}</ul>
//     </body>
//   </html>
//   `;
//   res.end(html);
// });

// Serve the public directory incl css file
server.use(staticHandler);
