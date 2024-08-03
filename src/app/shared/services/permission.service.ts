import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  canActivate(): boolean {
    const authed = JSON.parse(JSON.stringify(localStorage.getItem('user' || ''))) || null;
    return !!authed;

  }
}
