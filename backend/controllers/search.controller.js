import { User } from "../models/user.model.js"
import { fecthFromTMDB } from "../services/tmdb.service.js"

export async function searchPerson(req, res) {

    try {
        const { query } = req.params
        const response = await fecthFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (response.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: 'person',
                    createdAt: new Date()
                }
            }
        })

        res.status(200).json({ success: true, content: response.results })
    }
    catch (error) {
        console.log('Error in searchPerson controller: ', error.message)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function searchMovie(req, res) {

    try {
        const { query } = req.params
        const response = await fecthFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`)
        if (response.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: 'movie',
                    createdAt: new Date()
                }
            }
        })

        res.status(200).json({ success: true, content: response.results })
    }
    catch (error) {
        console.log('Error in searchMovie controller: ', error.message)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function searchTv(req, res) {

    try {
        const { query } = req.params
        const response = await fecthFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`)

        if (response.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: 'tv',
                    createdAt: new Date()
                }
            }
        })

        res.status(200).json({ success: true, content: response.results })
    }
    catch (error) {
        console.log('Error in searchTV controller: ', error.message)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function getSearchHistory(req, res) {

    try {
        res.status(200).json({ success: true, content: req.user.searchHistory })
    } catch (error) {
        console.log('Error in getSearchHistory controller: ', error.message)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export async function removeItemFromSearchHistory(req, res) {

    try {
        const { id } = req.params

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: parseInt(id) }
            }
        })

        res.status(200).json({ success: true, message: 'Item removed from search history' })

    } catch (error) {
        console.log('Error in removeItemFromSearchHistory controller: ', error.message)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}