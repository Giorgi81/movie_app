import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {PermissionService} from "../services/permission.service";

export const AuthGuard: CanActivateFn = (): boolean => {
  return inject(PermissionService).canActivate();
}
