import React from 'react';

import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';



export const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
  
    const exportToCSV = (apiData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(apiData);
      XLSX.utils.sheet_add_aoa(ws, [["Id", "Name", "Email", "Title"]], { origin: "A1" });

      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };
  
    return (
      <div onClick={(e) => exportToCSV(apiData, fileName)}>download file here</div>
    );
  };
