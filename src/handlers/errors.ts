import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from '../types/error';

// Catch Errors Handler
export const catchErrors = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<Response<any> | undefined>
) => {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
};

// Not Found Error Handler
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as HttpError;
  err.status = 404;
  next(err);
};

// Development Error Handler
export const developmentErrors = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  err.stack = err.stack || '';
  const errorDetails = {
    status: err.status || 500,
    message: err.message,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };

  res.status(err.status || 500);
  res.format({
    'text/html': () => {
      res.render('error', errorDetails);
    },
  });
};

// Production Error Handler
export const productionErrors = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    status: err.status || 500,
    message: err.message,
    error: {},
  });
};
