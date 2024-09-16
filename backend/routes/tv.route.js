import express from 'express'
import {
    getTrendingTv,
    getTvTrailers,
    getTvDetails,
    getSimilarTvs,
    getTvsByCategory
} from '../controllers/tv.controller.js'

const router = express.Router()
router.get('/trending', getTrendingTv)
router.get('/:id/trailers', getTvTrailers) //:id is a placeholder for the movie id sent in the request
router.get('/:id/details', getTvDetails)
router.get('/:id/similar', getSimilarTvs)
router.get('/:category', getTvsByCategory)


export default router