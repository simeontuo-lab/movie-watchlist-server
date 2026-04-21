import express from 'express'
import movies from './movies.js'

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the movie watchlist server."
    })
})

app.get("/movies", (req, res) => {
    res.json(movies)
})

app.get("/movies/:name", (req, res) => {
    res.json(movies.find(movie => movie.title === req.params.name))
})

app.get("/movies/actor/:actorName", (req, res) => {
    res.json(movies.filter(movie => movie.starring.includes(req.params.actorName)))
})

let counter = 20

app.post("/movies", (req, res) => {
    const newMovie = {
        title: req.body.title,
        starring: req.body.starring,
        year: req.body.year,
        watched: false,
        id: counter++
    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

const port = 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})