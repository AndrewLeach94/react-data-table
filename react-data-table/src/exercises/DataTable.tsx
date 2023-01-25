import React, {useState, useEffect} from "react";
import { ParseResult } from 'papaparse';
import { usePapaParse } from 'react-papaparse';
import { Grid, Typography, Paper } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {}

const DataTable: React.FC<DataTableProps> = () => {

  const [csvData, setCsvData] = useState <Record<string, string>[]>([]);

  const { readRemoteFile } = usePapaParse();

  const loadData = () => {
    readRemoteFile(window.location.href + '/data.csv', {
      worker: true,
      header: true,
      download: true,
      complete: (results: ParseResult<Record<string, string>>) => {
        setCsvData(results.data);
        console.log("CSV Data Loaded!")
      }
    });
  };

  const columns: GridColDef[] = [
    { field: 'time', headerName: 'Time', width: 200 },
    { field: 'humidity', headerName: 'Humidity (%)', width: 100 },
    { field: 'salinity', headerName: 'Salinity', width: 100 },
    { field: 'airTemperature', headerName: 'Air Temperature (°C)', width: 150 },
    { field: 'waterTemperature', headerName: 'Water Temperature (°C)', width: 200 },
    { field: 'windSpeed', headerName: 'Wind Speed (kph)', width: 150 },
  ];

  const rows = csvData.map((element, index) => {
    return {
      id: `row-${index}`,
      time: element.time,
      humidity: element.humidity,
      salinity: element.salinity,
      airTemperature: element.air_temperature,
      waterTemperature: element.water_temperature,
      windSpeed: element.wind_speed,
    }
  })
  
  useEffect(() => {
    loadData()
  })
  

  return (
    <Grid container direction="column">
      <Paper style={{ padding: 25, marginBottom: 75 }}>

        <Typography variant="h3" align="center">
          Data Table
        </Typography>

        <Typography paragraph component="div">
          This exercise is add features to the Data Table below:
          <ul>
            <li>
              <b>Autoload:</b> Instead of using the "Load CSV Data" button to
              populate the data table, populate the table without any manual
              intervention or clicking.
            </li>
            <li>
              <b>Pagination:</b> This data table should support pagination
              so the entire table isn't shown in a single table.
            </li>
            <li>
              <b>Column Sorting:</b> Clicking on a column header should sort the
              table by that column.
            </li>
            <li>
              <b>Styling:</b> Style this data table so it looks more appealing. Feel free to use
              the `style` prop on the components (as seen in this code) or completely
              replace the UI libraries. It is up to you.
            </li>
          </ul>
        </Typography>

        <Typography paragraph component="div">
          You are free to change this application in any way to implement the features above.
          You may add additional dependencies to this project and load the CSV data differently
          if you would like.
        </Typography>

        <Typography paragraph component="div">
        <div style={{height: 500, width: "100%"}}>
          <DataGrid
            rows={rows} 
            columns={columns}
            pageSize={10}
          />      
        </div>
        </Typography>

      </Paper>
    </Grid>
  );

};

export default DataTable;
