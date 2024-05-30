import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({ withCredentials: true });
  inject(UserService).checkLoginStatus();
  return next(clonedReq);
};
