import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { CredentialsService } from '../../shared/services/credentials.service';
import { AlertController, NavController } from '@ionic/angular';

// TODO save timeperiode in storage and preselect in alert

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public visitorsRealtime: number = 0;
  public siteId: string = '';
  public uniqueVisitors: number = 0;
  public pageViews: number = 0;
  public uniqueVisitorsPeriode: string = 'month';
  public pageViewsPeriode: string = 'month';

  constructor(
    private apiService: ApiService,
    private credentialsService: CredentialsService,
    private router: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.initData();
    this.getRealtimeVisits().then();
    this.getPageViews(this.pageViewsPeriode).then();
    this.getUniqueVisitors(this.uniqueVisitorsPeriode).then();
    this.initRealtime();
  }

  ngOnDestroy(): void {
  }

  initData(): void {
    const siteId = this.credentialsService.getCredential('plausibleSiteId');
    if (siteId) {
      this.siteId = siteId;
    }
  }

  initRealtime(): void {
    setInterval(() => {
      this.getRealtimeVisits().then();
    }, 10000);
  }

  async getRealtimeVisits(): Promise<any> {
    const resp = await this.apiService.getRealTimeVisits();
    console.log('getRealtimeVisits', resp.data);
    this.visitorsRealtime = resp.data;
  }

  async getUniqueVisitors(periode: string): Promise<any> {
    const resp = await this.apiService.getUniqueVisitors(periode);
    console.log('getUniqueVisitors', resp.data);
    this.uniqueVisitors = resp.data.results.visitors.value;
  }

  async getPageViews(periode: string): Promise<any> {
    const resp = await this.apiService.getPageViews(periode);
    console.log('getPageViews', resp.data);
    this.pageViews = resp.data.results.pageviews.value;
  }

  async openPage(path: string): Promise<any> {
    await this.router.navigateRoot(`/${path}`,{
      replaceUrl : true
    });
  }

  async selectTimePeriode(type: string): Promise<any> {
    const alert = await this.alertController.create({
      header: 'Select time periode',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      inputs: [
        {
          label: 'Day',
          type: 'radio',
          value: 'day',
        },
        {
          label: 'Last 7 days',
          type: 'radio',
          value: '7d',
        },
        {
          label: 'Last 30 days',
          type: 'radio',
          value: '30d',
        },
        {
          label: 'Actual month',
          type: 'radio',
          value: 'month',
        },
        {
          label: 'Last 6 month',
          type: 'radio',
          value: '6mo',
        },
        {
          label: 'Last 12 month',
          type: 'radio',
          value: '12mo',
        }
      ],
    });

    await alert.present();

    const { data, role } = await alert.onDidDismiss();

    if (role !== 'confirm') {
      return;
    }

    if (type === 'uniqueVisitors') {
      this.uniqueVisitorsPeriode = data.values ? data.values : 'month';
      this.getUniqueVisitors(this.uniqueVisitorsPeriode).then();
    } else if (type === 'pageViews') {
      this.pageViewsPeriode = data.values ? data.values : 'month';
      this.getPageViews(this.pageViewsPeriode).then();
    }
  }

  async reloadRealtime(): Promise<any> {
    await this.getRealtimeVisits();
  }
}
