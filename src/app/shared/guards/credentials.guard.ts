import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { CredentialsService } from '../services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialsGuard implements CanActivate {

  constructor(
    private router: NavController,
    private credentialsService: CredentialsService
  ) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    const token = this.credentialsService.getCredential('plausibleToken');
    const siteId = this.credentialsService.getCredential('plausibleSiteId');

    console.log('guard');
    console.log(token);
    console.log(siteId);

    if (!token || !siteId) {
      this.router.navigateRoot('/settings',{
        replaceUrl : true
      }).then();
      return false;
    }

    return true;
  }

}
