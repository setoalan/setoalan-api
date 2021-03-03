import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from '../types/error';

// eslint-disable-next-line no-unused-vars
export const catchErrors = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as HttpError;
  err.status = 404;
  next(err);
};

export const developmentErrors = (err: HttpError, req: Request, res: Response) => {
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

export const productionErrors = (err: HttpError, req: Request, res: Response) => {
  res.status(err.status || 500);
  res.render('error', {
    status: err.status || 500,
    message: err.message,
    error: {},
  });
};
