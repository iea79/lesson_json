var ss = SpreadsheetApp.getActiveSpreadsheet(), // spreadsheet
      s = ss.getActiveSheet(); // sheet

function getData(){
  var result = [],
      range = 'A:E', // диапазон ячеек, который хотим выгружать
      values = s.getRange(range).getValues(),
      last_row = parseInt(s.getLastRow());

  for (var i = 1; i < last_row; i++) {
      result.push(values[i]);
  }
  return result;
}


function doGet() {
  var data = getData();
  if(!data) {
    data = '';
  }
  return ContentService.createTextOutput(
    JSON.stringify({'result': data})).setMimeType(ContentService.MimeType.JSON);
}
