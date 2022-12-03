import { queryByLabelText } from "@testing-library/react";
import { list } from "postcss";
import depData from "./data/dept.json";
var json = depData;
var map = new Map(Object.entries(json));
var data = map.get("value");

var activeDept = new Array();
var finalChart;

//Get Dept
for (var i in data) {
  var key = i;
  var val = data[i];
  for (var j in val) {
    var sub_key = j;
    var sub_val = val[j];

    activeDept.push(data[i]);
    break;
  }
}

function test(chart, remainData, ids) {
  //根節點
  if (finalChart == null) {
    let idList = new Array();
    remainData = activeDept;
    for (var i in remainData) {
      if (remainData[i]["parent"] === null) {
        let jsonstr =
          "{" +
          '"name":' +
          '"' +
          remainData[i]["dept"] +
          '"' +
          ",\n" +
          '"attributes":{\n' +
          "},\n" +
          '"departmentId":' +
          '"' +
          remainData[i]["name"] +
          '"\n,' +
          '"children":' +
          "[]" +
          "}";
        let jsonObj = JSON.parse(jsonstr);
        let newChart = jsonObj;
        idList.push(remainData[i]["name"]);
        finalChart = newChart;
        remainData.splice(i, 1);
        break;
      }
    }
    test(finalChart, remainData, idList);
  } else if (finalChart != null && remainData != null && ids != null) {
    let idList = new Array();
    for (let i in ids) {
      let child = new Array();

      for (let j in remainData) {
        if (remainData[j]["parent"] === ids[i]) {
          let jsonstr =
            "{" +
            '"name":' +
            '"' +
            remainData[j]["dept"] +
            '"' +
            ",\n" +
            '"attributes":{\n' +
            "},\n" +
            '"departmentId":' +
            '"' +
            remainData[j]["name"] +
            '"\n,' +
            '"children":' +
            "[]" +
            "}";
          child.push(JSON.parse(jsonstr));
          idList.push(remainData[j]["name"]);
        }
      }

      if (finalChart["departmentId"] === ids[i]) {
        for (var k in finalChart) {
          var key = k;
          var val = finalChart[k];
          if (key === "children") {
            val = child;
          }
        }
        finalChart["children"] = val;
      }
    }
    for (let i in idList) {
      layer2(finalChart, remainData, idList[i]);
    }
  }
  return finalChart;
}

function layer2(finalChart, remainData, id) {
  let child = new Array();
  let idList = new Array();

  for (let j in remainData) {
    if (remainData[j]["parent"] === id) {
      let jsonstr =
        "{" +
        '"name":' +
        '"' +
        remainData[j]["dept"] +
        '"' +
        ",\n" +
        '"attributes":{\n' +
        "},\n" +
        '"departmentId":' +
        '"' +
        remainData[j]["name"] +
        '"\n,' +
        '"children":' +
        "[]" +
        "}";
      child.push(JSON.parse(jsonstr));
      idList.push(remainData[j]["name"]);
    }
  }
 
  for(i in finalChart["children"]){
    if(finalChart["children"][i]["departmentId"]===id){
      finalChart["children"][i]["children"] = child;
    }
  }

  for (let i in idList) {
    layer2(finalChart, remainData, idList[i]);
  }
  return finalChart;
}

export { test };
