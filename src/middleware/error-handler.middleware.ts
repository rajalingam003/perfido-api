import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@nestjs/common';
import { MESSAGES } from '../common/utils/messages';

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
      message: (response as any).message || MESSAGES.unexpectedError,
      error: (response as any).error || MESSAGES.error,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      message: MESSAGES.serverError,
      error: MESSAGES.serverError,
    });
  }
}
