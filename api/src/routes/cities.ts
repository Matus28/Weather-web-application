import express from 'express'
import {
  addCity,
  deleteCity,
  getCities,
  getDefaultCity,
  setDefaultCity,
} from '../controllers/cityController'
import { requireAuth } from '../middleware/requireAuth'

export const router = express.Router()

// Check for authentication (token) = require auth for all cities routes
router.use(requireAuth)

// GET all saved cities
router.get('/', getCities)

// GET user's default city
router.get('/default', getDefaultCity)

// POST new city
router.post('/', addCity)

// PUT = set default city
router.put('/default', setDefaultCity)

// DELETE city from list
router.delete('/:id', deleteCity)
