const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fs = require('fs').promises
const db = require
// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");

});


app.post("/submit", (req, res) => {
  console.log(req.body)
  fav_books = []
  fav_artist = []
  const name = req.body.name
  const aboutMe = req.body.Aboutme
  const githubURL = req.body.githubUrl
  const twitterURL = req.body.twitterUrl
  let books = req.body.FavoriteBooks
  let artists = req.body.FavoriteArtists
  artists = artists.split(',')
  books = books.split(',')
  console.log(artists)
  console.log(books)
  fs.readFile('database.json', 'utf-8')
    .then((data) => {
      let test = JSON.parse(data)
      console.log(test['users'])
      const newUser = {
        id: test['users'].length + 1,
        fullName: name,
        aboutMe: aboutMe,
        knownTechnologies: [],
        githubUrl: githubURL,
        twitterUrl: twitterURL,
        favoriteBooks: books,
        favoriteArtists: artists

      }
      test['users'].push(newUser)
      console.log(test['users'])
      let json = JSON.stringify(test)
      fs.writeFile('database.json', json)
    })
    .catch((err) => console.log(err))

});


app.get("/people/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile('database.json', 'utf-8')
    .then((data) => {
      let db = JSON.parse(data);
      const user_data = db['users'].find((value) => {
        if (value.id == id) {
          console.log(value)
          return value;
        }
      })
      // res.render('homepage',{user:user_data}) Should work but doesn't.
    })
    res.render('homepage',{user: {
      "id": "54az3",
      "fullName": "Armaan Dhanji",
      "aboutMe": "Hi, my name is Armaan Dhanji but I'm better known by my nickname @armaand, and I'm a teacher in the School of Computing at BCIT.",
      "knownTechnologies": [
        "HTML",
        "CSS",
        "JS",
        "Git",
        "React",
        "Node.js"
      ],
      "githubUrl": "github.com/adhanji8",
      "twitterUrl": "twitter.com/bcit",
      "favoriteBooks": [
        "The Lord of the Rings - J. R. R. Tolkien",
        "Foundation Series - Isaac Asimov",
        "Cracking the Coding Interview - Gayle Laakmann",
        "Clean Code - Rob Martin",
        "A Brief History of Time - Stephen Hawking"
      ],
      "favoriteArtists": []
    }})
    .catch((err) => console.log(err))
});


app.get("/homepage", (req, res) => {
  res.render("homepage");
});



app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
