import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../../shared/services/credentials.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public token: string = '';
  public siteId: string = '';
  public tokenError: boolean = false;
  public siteIdError: boolean = false;
  public showPassword: boolean = true;

  constructor(
    private credentialsService: CredentialsService,
    private router: NavController
  ) { }

  ngOnInit(): void {
    this.initCredentials();
  }

  initCredentials(): void {
    const token = this.credentialsService.getCredential('plausibleToken') ? this.credentialsService.getCredential('plausibleToken') : '';
    if (token) {
      this.token = token;
    }
    const siteId = this.credentialsService.getCredential('plausibleSiteId') ? this.credentialsService.getCredential('plausibleSiteId') : '';
    if (siteId) {
      this.siteId = siteId;
    }
  }

  async saveCredentials(): Promise<any> {
    this.tokenError = false;
    this.siteIdError = false;

    if (!this.token) {
      this.tokenError = true;
    }
    if (!this.siteId) {
      this.siteIdError = true;
    }

    if (this.siteIdError || this.tokenError) {
      return;
    }

    this.credentialsService.setCredential('plausibleToken', this.token);
    this.credentialsService.setCredential('plausibleSiteId', this.siteId);

    await this.router.navigateRoot('/',{
      replaceUrl : true
    });
  }

  async openPage(path: string): Promise<any> {
    await this.router.navigateRoot(`/${path}`,{
      replaceUrl : true
    });
  }

  togglePassword(element: any): void {
    if (this.showPassword) {
      this.showPassword = false;
      element.type = 'text';
    } else {
      this.showPassword = true;
      element.type = 'password';
    }
  }

}
