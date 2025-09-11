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

export const exportToExcel = (
  data: Record<string, unknown>[],
  headers: string[]
): string => exportToCsv(data, headers).replace(/,/g, '\t');

export const exportToPdf = (
  data: Record<string, unknown>[],
  headers: string[]
): string => exportToCsv(data, headers).replace(/,/g, ' | ');

export interface ImportOptions<T> {
  columnMap: Record<string, keyof T>;
  validate?: (row: Partial<T>) => row is T;
}

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
    keys.forEach((key, idx) => {
      if (!key) return;
      let value = values[idx] || '';
      value = value.replace(/^"|"$/g, '').replace(/""/g, '"');
      (obj as any)[key] = value;
    });
    if (validate) {
      if (validate(obj)) result.push(obj);
    } else {
      result.push(obj as T);
    }
  }
  return result;
};

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
