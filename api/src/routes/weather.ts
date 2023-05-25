import express from 'express'
import { getWeatherData } from '../controllers/weatherController'
import { requireAuth } from '../middleware/requireAuth'

export const router = express.Router()

// Check for authentication (token) = require auth for all cities routes
router.use(requireAuth)

// GET weather for specific city
router.get('/:location', getWeatherData)
