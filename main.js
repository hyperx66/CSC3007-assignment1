$(document).ready(function () {
  var multiArr = [];
  var regions = ["west", "national", "east", "central", "south", "north"];
  var tableObj = $("#myTable").DataTable();
  $.get("https://api.data.gov.sg/v1/environment/psi", function (data) {
    var counter = 0;
    for (key in data["items"][0]["readings"]) {
      if (counter == 0) {
        for (reg in regions) {
          newArr = [];
          newArr.push(regions[reg])
          newArr.push(data["items"][0]["readings"][key][regions[reg]]);
          multiArr.push(newArr);
          console.log(multiArr)
        }
        counter += 1;
      } else {
        for (reg in regions) {
          multiArr[sortRegion(regions[reg])].push(data["items"][0]["readings"][key][regions[reg]]);
        }
      }
    }
    for (row in multiArr) {
      tableObj.row.add(multiArr[row]).draw(false);
    }
  });
});

function sortRegion(regionName) {
  switch (regionName) {
    case "west":
      return 0;
    case "national":
      return 1;
    case "east":
      return 2;
    case "central":
      return 3;
    case "south":
      return 4;
    case "north":
      return 5;
    default:
      return 0;
  }
}
