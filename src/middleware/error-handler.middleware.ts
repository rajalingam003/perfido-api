import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@nestjs/common';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpException) {
    const response = err.getResponse();
    const status = err.getStatus();
    res.status(status).json({
      statusCode: status,
      message: (response as any).message || 'Unexpected error occurred',
      error: (response as any).error || 'Error',
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: 'Internal Server Error',
    });
  }
}
