import { Request, Response, NextFunction } from 'express'
import { User } from '../models/userModel'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

interface UserId {
  _id: string
}

export interface ErrorResponse {
  error: string
}

// Add user property to Request type
declare global {
  namespace Express {
    interface Request {
      user: UserId
    }
  }
}

declare global {
  namespace Express {
    interface Response {
      error: string
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<ErrorResponse | undefined> => {
  // Verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required.' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET as jwt.Secret) as jwt.JwtPayload

    // attach user property to request (for another middleware)
    req.user = (await User.findOne({ _id }).select('_id')) ?? { _id: '' }
    next()
  } catch (error: unknown) {
    res.status(401).json({ error: 'Request is not authorized.' })
  }
}
