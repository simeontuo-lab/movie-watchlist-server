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

app.get("/watchedMovies", (req, res) => {
    res.json(movies.filter(movie => movie.watched))
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

app.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = movies.findIndex(movie => movie.id === id)

    if (index === -1) {
        return res.status(404).json({error: `No movie with id ${id}.`})
    }

    const deletedMovie = movies.splice(index, 1)
    res.json({message: "Deleted:", movie: deletedMovie})
})

app.patch("/movies/:id/toggle-watched", (req, res) => {
    const id = parseInt(req.params.id)
    const movie = movies.find(movie => movie.id === id)
    movie.watched = !movie.watched
    res.json({message: "Toggled watched status of:", movie: movie})
})

const port = 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})