import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface Row {
  [key: string]: string;
}

const CSVDisplay: React.FC<{ url: string }> = ({ url }) => {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const reader = response.body?.getReader();
      if (!reader) return;
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const parsedData = Papa.parse(csv, { header: true }).data as Row[];
      setData(parsedData);
    };

    fetchData();
  }, [url]);

  return (
    <div>
      <h2>CSV Data</h2>
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, columnIndex) => (
                <td key={columnIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVDisplay;