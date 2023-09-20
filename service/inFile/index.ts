import fs from 'fs';
import path from 'path';

export async function writeFile(type, userId: number, data: any): Promise<string> {
  const file = `./temp/${type}-${userId}.csv`;
  const filePath = path.join(__dirname, file);
  try {
    const csv = data.map((item) => {
      const temp = Object.keys(item).map((key) => item[key]);
      return temp.join(';');
    });
    fs.writeFileSync(filePath, csv.join('\n'));
  } catch (err) {
    console.log('writeFile fail', JSON.stringify(err));
    return null;
  }
  return filePath;
}

export function deleteFile(userId: number) {
  try {
    const file1 = path.join(__dirname, `./temp/location-${userId}.csv`);
    const file2 = path.join(__dirname, `./temp/step-${userId}.csv`);
    fs.unlinkSync(file1);
    fs.unlinkSync(file2);
  } catch (err) {}
}
