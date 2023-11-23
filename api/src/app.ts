/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'

import cors from 'cors'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { ZodError } from 'zod'

import { resolve } from 'path'
import { AppError } from './app-error'
import { routes } from './routes'

const app = express()
const server = createServer(app)

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/images', express.static(resolve(__dirname, 'uploads', 'images')))

const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', () => {
  console.log('connected')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: err.format() })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message })
  }

  return res.status(500).send(err.message)
})

export { io, server }
