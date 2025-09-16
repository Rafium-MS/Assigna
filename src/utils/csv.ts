/**
 * Exports data to a CSV formatted string.
 * @param data An array of objects to be exported.
 * @param headers An array of strings representing the headers of the CSV file.
 * @returns A string representing the data in CSV format.
 */
export const exportToCsv = (
  data: Record<string, unknown>[],
  headers: string[]
): string => {
  const date = new Date().toISOString().split('T')[0];
  const lines: string[] = [`generated_at,${date}`, headers.join(',')];
  data.forEach((row) => {
    const line = headers
      .map((h) => {
        const value = row[h];
        if (value === undefined || value === null) return '';
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',');
    lines.push(line);
  });
  return lines.join('\n');
};

/**
 * Exports data to a tab-separated format, suitable for Excel.
 * @param data An array of objects to be exported.
 * @param headers An array of strings representing the headers of the file.
 * @returns A string representing the data in a tab-separated format.
 */
export const exportToExcel = (
  data: Record<string, unknown>[],
  headers: string[]
): string => exportToCsv(data, headers).replace(/,/g, '\t');

/**
 * Exports data to a pipe-separated format.
 * @param data An array of objects to be exported.
 * @param headers An array of strings representing the headers of the file.
 * @returns A string representing the data in a pipe-separated format.
 */
export const exportToPdf = (
  data: Record<string, unknown>[],
  headers: string[]
): string => exportToCsv(data, headers).replace(/,/g, ' | ');

/**
 * Represents the options for importing a CSV file.
 * @template T The type of the objects to be imported.
 */
export interface ImportOptions<T> {
  /** A map of CSV column headers to object keys. */
  columnMap: Record<string, keyof T>;
  /** An optional function to validate each row. */
  validate?: (row: Partial<T>) => row is T;
}

/**
 * Imports data from a CSV formatted string.
 * @template T The type of the objects to be imported.
 * @param csv The CSV string to be imported.
 * @param options The import options.
 * @returns An array of objects imported from the CSV string.
 */
export const importCsv = <T>(
  csv: string,
  { columnMap, validate }: ImportOptions<T>
): T[] => {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  let headerIndex = 0;
  if (lines[0].startsWith('generated_at')) headerIndex = 1;
  const csvHeaders = lines[headerIndex].split(',');
  const keys = csvHeaders.map((h) => columnMap[h.trim()]);
  const result: T[] = [];
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj: Partial<T> = {};
    const target = obj as Record<keyof T, unknown>;
    keys.forEach((key, idx) => {
      if (!key) return;
      let value = values[idx] || '';
      value = value.replace(/^"|"$/g, '').replace(/""/g, '"');
      target[key] = value;
    });
    if (validate) {
      if (validate(obj)) result.push(obj);
    } else {
      result.push(obj as T);
    }
  }
  return result;
};

/**
 * Triggers a file download in the browser.
 * @param content The content of the file to be downloaded.
 * @param filename The name of the file to be downloaded.
 * @param mime The MIME type of the file.
 */
export const downloadFile = (
  content: string,
  filename: string,
  mime: string
): void => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
