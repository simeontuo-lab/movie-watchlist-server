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
    console.log(req.body)
    const title = req.body.title
    const starring = req.body.starring
    const year = req.body.year
    // const watched = req.body.watched
    // const id = movies.length + 1


    const newMovie = {
        title: title,
        starring: starring,
        year: year,
        watched: false,
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)

})

app.delete("/movies/:id", (req, res)  => {
  const id = parseInt(req.params.id)
  const index = movies.findIndex(movie => movie.id === id)
  movies.splice(index, 1)

 
})
res.json({
    message: `Movie deleted ${req.params.id }.`
})  

    
    const port = 3000


app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})

