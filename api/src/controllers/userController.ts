import { Request, Response } from 'express'
import { User } from '../models/userModel'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const createToken = (_id: string): string => {
  return jwt.sign({ _id }, process.env.SECRET as string, { expiresIn: '3d' })
}

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    }
  }
}

// Signup user
export const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error: unknown) {
    if (error instanceof Error) {
      let statusCode = 400
      if (error.message === 'Email already used.') statusCode = 409
      res.status(statusCode).json({ error: error.message })
    }
  }
}

// Remove user (avalible for admin)
export const removeUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body
  const { authorization } = req.headers
  const _idAdmin = '651a9e37a54ac7c775f8f494'

  if (!authorization) {
    res.status(401).json({ error: 'Unauthorized.' })
    return
  }

  const token = authorization.replace('Bearer ', '')
  const { _id } = jwt.verify(token, process.env.SECRET as jwt.Secret) as jwt.JwtPayload

  if (_id !== _idAdmin) {
    res.status(401).json({ error: 'User unauthorized for this action.' })
    return
  }

  try {
    const user = await User.deleteOne({ email: email })
    res.status(200).json(user)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    }
  }
}

// GET user list (for admin only)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { authorization } = req.headers
  const _idAdmin = '651a9e37a54ac7c775f8f494'
  if (!authorization) {
    res.status(401).json({ error: 'Unauthorized.' })
    return
  }

  const token = authorization.replace('Bearer ', '')
  const { _id } = jwt.verify(token, process.env.SECRET as jwt.Secret) as jwt.JwtPayload

  if (_id !== _idAdmin) {
    res.status(401).json({ error: 'User unauthorized for this action.' })
    return
  }

  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    }
  }
}
