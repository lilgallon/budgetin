import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const toastService = inject(ToastService)

  return next(req).pipe(
    catchError((error) => {
      console.error(error)
      toastService.error('Erreur', JSON.stringify(error))
      return EMPTY;
    })
  )
}
