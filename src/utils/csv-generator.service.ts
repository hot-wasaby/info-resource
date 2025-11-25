import { Injectable } from '@nestjs/common';

@Injectable()
export class CsvGeneratorService {
  generateCsv(data: any[], headers: string[]): string {
    if (!data || data.length === 0) {
      return headers.join(',') + '\n';
    }

    // Escape and format a value for CSV
    const escapeValue = (value: any): string => {
      if (value === null || value === undefined) {
        return '';
      }

      const stringValue = String(value);
      // If value contains comma, newline, or quote, wrap in quotes and escape quotes
      if (
        stringValue.includes(',') ||
        stringValue.includes('\n') ||
        stringValue.includes('"')
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    // Create header row
    const csvContent = [headers.join(',')];

    // Create data rows
    data.forEach((row) => {
      const values = headers.map((header) => escapeValue(row[header]));
      csvContent.push(values.join(','));
    });

    return csvContent.join('\n');
  }
}
