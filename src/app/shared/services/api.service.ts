import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private credentialsService: CredentialsService
  ) { }

  async getRealTimeVisits(): Promise<any> {
    const token = this.credentialsService.getCredential('plausibleToken');
    const siteId = this.credentialsService.getCredential('plausibleSiteId');
    const options = {
      url: `https://plausible.io/api/v1/stats/realtime/visitors?site_id=${siteId}`,
      headers: { 'Authorization': `Bearer ${token}` }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response;
  };

  async getUniqueVisitors(periode: string): Promise<any> {
    const token = this.credentialsService.getCredential('plausibleToken');
    const siteId = this.credentialsService.getCredential('plausibleSiteId');
    const options = {
      url: `https://plausible.io/api/v1/stats/aggregate?site_id=${siteId}&period=${periode}&metrics=visitors`,
      headers: { 'Authorization': `Bearer ${token}` }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response;
  };

  async getPageViews(periode: string): Promise<any> {
    const token = this.credentialsService.getCredential('plausibleToken');
    const siteId = this.credentialsService.getCredential('plausibleSiteId');
    const options = {
      url: `https://plausible.io/api/v1/stats/aggregate?site_id=${siteId}&period=${periode}&metrics=pageviews`,
      headers: { 'Authorization': `Bearer ${token}` }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response;
  };
}
