import { HttpInterceptorFn } from '@angular/common/http';

export const JokeInterceptor: HttpInterceptorFn = (req, next) => {
  const authRequest = req.clone({
    setHeaders: {
      Accept: 'application/json',
    },
  });
  return next(authRequest);
};
