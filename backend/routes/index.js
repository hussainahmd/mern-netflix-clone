import authRoutes from './auth.route.js'
import movieRoutes from './movie.route.js'
import tvRoutes from './tv.route.js'
import searchRoutes from './search.route.js'

import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'

export const router = express.Router()

router.use('/auth', authRoutes)
router.use('/movie', protectRoute, movieRoutes)
router.use('/tv', protectRoute, tvRoutes)
router.use('/search', protectRoute, searchRoutes)
