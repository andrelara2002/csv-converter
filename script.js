converterCsv = value => {
  let lines = value.split("\n");
  var headers = lines[0].split(",");

  let result = [];

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return JSON.stringify(result);
};

converterJson = value => {
  var json = value;
  var fields = Object.keys(json[0]);
  var replacer = function(key, value) {
    return value === null ? "" : value;
  };
  var csv = json.map(function(row) {
    return fields
      .map(function(fieldName) {
        return JSON.stringify(row[fieldName], replacer);
      })
      .join(",");
  });
  csv.unshift(fields.join(","));
  csv = csv.join("\r\n");
  return csv;
};
document.getElementById("deletar").onclick = () => {
  document.getElementById("csvInput").value = "";
  document.getElementById("jsonInput").value = "";
};

document.getElementById("converter").onclick = () => {
  let csvValue = document.getElementById("csvInput");
  let jsonValue = document.getElementById("jsonInput");

  if (csvValue.value.toString() === "" && jsonValue.value.toString() === "") {
    alert("Por favor insira um valor");
  } else {
    if (csvValue.value.toString() != "" && jsonValue.value.toString() != "") {
      alert("você só pode converter um tipo de cada vez");
    } else if (csvValue.value.toString() != "") {
      jsonValue.value = converterCsv(csvValue.value.toString());
      csvValue.value = "";
    } else if (jsonValue.value.toString() != "") {
      csvValue.value = converterJson(JSON.parse(jsonValue.value.toString()));
      jsonValue.value = "";
    }
  }
};
