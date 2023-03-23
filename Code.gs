var settings = {
  'spreadsheet': 'Your Paretolytics Spreadsheet url', // URL of the spreadsheet to populate
  'metrics': ['campaign.name', 'segments.product_title', 'metrics.impressions', 'metrics.clicks', 'metrics.ctr', 'metrics.cost_micros', 'metrics.average_cpc', 'metrics.conversions', 'metrics.cost_per_conversion', 'metrics.conversions_value'], // Metrics to extract
};

function main() {
  var query30 = 'SELECT segments.product_item_id, ' + settings['metrics'].join(',') + ' FROM shopping_performance_view WHERE segments.date DURING LAST_30_DAYS'; // Get the product IDs and all metrics for shopping campaigns in the last 30 days
  var query7 = 'SELECT segments.product_item_id, ' + settings['metrics'].join(',') + ' FROM shopping_performance_view WHERE segments.date DURING LAST_7_DAYS'; // Get the product IDs and all metrics for shopping campaigns in the last 7 days
  var report30 = AdsApp.report(query30); // Download the 30-day report
  var report7 = AdsApp.report(query7); // Download the 7-day report
  var spreadsheet = SpreadsheetApp.openByUrl(settings['spreadsheet']); // Open the spreadsheet
  // If there is a sheet named "30Days", open it. Otherwise, create it.
  if(spreadsheet.getSheetByName('30Days')!=null){
    var days30 = spreadsheet.getSheetByName('30Days')
    } else {
        var days30 = spreadsheet.insertSheet('30Days');
    }
  report30.exportToSheet(days30); // Write the 30-day report to the "30Days" sheet
  SpreadsheetApp.flush();
  // If there is a sheet named "7Days", open it. Otherwise, create it.
  if(spreadsheet.getSheetByName('7Days')!=null){
    var days7 = spreadsheet.getSheetByName('7Days')
    } else {
        var days7 = spreadsheet.insertSheet('7Days');
    }
   report7.exportToSheet(days7); // Write the 7-day report to the "7Days" sheet
}
