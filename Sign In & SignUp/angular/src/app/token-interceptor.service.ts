import { Injectable,Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LinkService } from './link.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{ 
  constructor(private injector: Injector){}
   
  intercept(req, next){
    let linkService =this.injector.get(LinkService)
    let tokenizedReq =req.clone({
      setHeaders: {
        Authorization: `Bearer ${linkService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

  
}
