import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

interface IFields {
  [key: string]: unknown;
}

interface ICheckRequiredFieldsOptions {
  throwError?: boolean;
  /** Use `{property}` to replace into the missing key name */
  genericMessage?: string;
}

type RequiredFields<T> = {
  [P in keyof T]-?: T[P] extends undefined | null | '' ? P : never;
}[keyof T];

function isFields<F extends IFields>(fields: F): fields is F {
  return true;
}

/**
 * This will raise an AppError if any of the fields is missing
 */
export function checkRequiredFields<T>(
  fields: IFields,
  requiredFields: string[],
  options: ICheckRequiredFieldsOptions = {
    throwError: false,
    genericMessage: '{property} is missing',
  }
): RequiredFields<T>[] | undefined {
  if (!isFields(fields)) {
    throw new Error('Invalid fields');
  }

  const errored = requiredFields
    .filter((key) => !fields[key])
    .map((key) => options.genericMessage?.replace('{property}', key));

  if (options.throwError && errored.length) {
    throw new AppError(errored.join(', '), 400);
  }

  return errored.length ? (errored as RequiredFields<T>[]) : undefined;
}

/**
 * Middleware that checks for required fields in the request body
 */
export function checkRequiredBodyFields(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const missingFields = fields.filter((field) => !body[field]);
    if (missingFields.length) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    next();
  };
}
