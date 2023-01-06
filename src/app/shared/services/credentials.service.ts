import { Injectable } from '@angular/core';

interface CredentialsProps {
  credentials: { token: string, siteId: string } | null;
}

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  constructor() { }

  setCredential(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  getCredential(name: string): string | null {
    return localStorage.getItem(name);
  }
}
