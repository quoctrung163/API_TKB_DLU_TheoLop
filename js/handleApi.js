// const Crawler = require("crawler");
// const HtmlTableToJson = require("html-table-to-json");
const tabletojson = require("tabletojson").Tabletojson;

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

var yearStudy = "";
var termID = "";
// var week = "";

const getYearAndTermStudy = () => {
  if (
    (month === 0) |
    (month === 1) |
    (month === 2) |
    (month === 3) |
    (month === 4) |
    (month === 5)
  ) {
    yearStudy = `${year - 1}-${year}`;
    termID = `HK02`;
  } else {
    console.log(`${year}-${year + 1}`);
    yearStudy = `${year}-${year + 1}`;
    termID = `HK01`;
  }
};

// const getWeek = () => {
//   let onejan = new Date(date.getFullYear(), 0, 1);
//   week = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
// };

getYearAndTermStudy();
// getWeek();

// const crawl = new Crawler({
//   maxConnections: 10,
//   callback: function(error, res, done) {
//     if (error) {
//       console.log(error);
//     } else {
//       var $ = res.$;
//       console.log($("title").text());
//     }
//     done();
//   }
// });

function getSchedule(week, classID) {
  const uri = `http://qlgd.dlu.edu.vn/public/DrawingClassStudentSchedules_Mau2?YearStudy=${yearStudy}&TermID=${termID}&Week=${week}&ClassStudentID=${classID}`;
  return new Promise(resolve => {
    // crawl.queue({
    //   uri,
    //   callback: function(error, res, done) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       var $ = res.$;

    //       const jsonTables = HtmlTableToJson.parse($.html());

    //       resolve(jsonTables.results);
    //     }
    //     done();
    //   }
    // });
    tabletojson.convertUrl(uri, { useFirstRowForHeadings: true }, function(
      tablesAsJson
    ) {
      var result = tablesAsJson[0];
      resolve(result);
    });
  });
}

module.exports = {
  getSchedule: getSchedule
};
