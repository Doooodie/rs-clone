import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

const isProd = process.env.NODE_ENV === 'production';
const queryUrl = isProd ? 'https://badoone-drive-backend.onrender.com' : 'http://127.0.0.1:5000';

export { isFetchBaseQueryError, isErrorWithMessage, queryUrl };
