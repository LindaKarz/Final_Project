import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

import { registerValidation, loginValidation, collectionCreateValidation } from './validation/validations.js'
import checkAuth from './utils/checkAuth.js'
import { register, login, getMe } from './controllers/UserController.js'
import { create, getAll, getOne, remove, update } from './controllers/CollectionController.js'
import handleValidationErrors from './utils/handleValidationErrors.js'

mongoose
  .connect('mongodb+srv://admin:262612@cluster.vdjrmmt.mongodb.net/')
  .then(() => console.log('DB works'))
  .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, _, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.get('/auth/me', checkAuth, getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/collections', getAll)
app.get('/collections:id', getOne)
app.post('/collections', checkAuth, collectionCreateValidation, handleValidationErrors, create)
app.delete('/collections:id', checkAuth, remove)
app.patch('/collections:id', checkAuth, collectionCreateValidation, handleValidationErrors, update)

app.listen(4444, (err) => {
  if(err) {
    return console.log(err)
  }

  console.log('Server works!')
})