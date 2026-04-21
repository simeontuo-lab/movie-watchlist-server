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

app.post("/movies", (req, res) => {

const port = 3000


app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})