import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatarDataService {

  constructor() { }

  convertToDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const [datePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');
    if (!day || !month || !year) return null;
    return new Date(+year, +month - 1, +day);
  }

  convertToDateStr(dateStr: string): string | null {
    if (!dateStr) return null;
    const [datePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');
    if (!day || !month || !year) return null;
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

  formatDateToCustomString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day} ${hours}:${minutes}:${seconds}`;
  }
}
