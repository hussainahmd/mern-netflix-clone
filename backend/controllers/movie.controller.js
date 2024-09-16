import { fecthFromTMDB } from "../services/tmdb.service.js"

export async function getTrendingMovie(req, res) {
    
    try {
        const data = await fecthFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

        res.json({ success: true, content: randomMovie })
    } catch (error) {

        console.log('Error in getTrendingMovie controller:', error.message)
        res.status(500).send({ success: false, message: 'Internal server error' })
    }
}

export async function getMovieTrailers(req, res) {

    try {
        const { id } = req.params

        const data = await fecthFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.json({ success: true, trailers: data.results })

    } catch (error) {
        console.log('Error in getMovieTrailers controller:', error.message)

        if (error.response?.status === 404)
            return res.status(404).send({ message: 'Trailer not found' })

        res.status(500).send({ success: false, message: 'Internal server error' })

    }
}

export async function getMovieDetails(req, res) {

    try {
        const { id } = req.params
        const data = await fecthFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({ success: true, content: data })

    } catch (error) {
        console.log('Error in getMovieDetails controller:', error.message)

        if (error.response?.status === 404)
            return res.status(404).send({ message: 'Movie details not found' })

        res.status(500).send({ success: false, message: 'Internal server error' })
    }
}

export async function getSimilarMovies(req, res){

    try {
        const { id } = req.params
        const data = await fecthFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({ success: true, similar: data.results })

    } catch (error) {
        console.log('Error in getSimilarMovies controller:', error.message)

        if (error.response?.status === 404)
            return res.status(404).send({ message: 'Movie similars not found' })

        res.status(500).send({ success: false, message: 'Internal server error' })
    }
}

export async function getMoviesByCategory(req, res) {
    
        try {
            const { category } = req.params
            const data = await fecthFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
            res.status(200).json({ success: true, content: data.results })
    
        } catch (error) {
            console.log('Error in getMoviesByCategory controller:', error.message)
    
            if (error.response?.status === 404)
                return res.status(404).send({ message: 'Movie category not found' })
    
            res.status(500).send({ success: false, message: 'Internal server error' })
        }   
}