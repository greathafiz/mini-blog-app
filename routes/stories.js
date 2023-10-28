import express from 'express'
const router = express.Router()
import {ensureAuth} from '../middleware/auth.js'

import Story from '../models/Story.js'

router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

router.post('/', ensureAuth, async (req,res) => {
    try {
        req.body.author = req.user.id
        await Story.create(req.body)
        res.redirect('dashboard')
    } catch (error) {
        console.error(error);
        res.render('error/500')
    }
})

export {router as storyRouter}