import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeperiode'
})
export class TimeperiodePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): any {
    let periode = 'Actual month';
    switch (value) {
      case 'day':
        periode = "Actual day";
        break;
      case '7d':
        periode = "Last 7 days";
        break;
      case '30d':
        periode = "Last 30 days";
        break;
      case '6mo':
        periode = "Last 6 month";
        break;
      case '12mo':
        periode = "Last 12 month";
        break;
    }
    return periode;
  }

}
