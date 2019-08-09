var ss = SpreadsheetApp.getActiveSpreadsheet(), // spreadsheet
    s = ss.getActiveSheet(), // sheet
    list = ss.getSheetByName('Data'), // выбираем лист "Data"
    range = 'A:F'; // диапазон ячеек, который хотим выгружать

function getData(){
  var result = [],
      values = list.getRange(range).getValues(),
      last_row = parseInt(list.getLastRow());

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
