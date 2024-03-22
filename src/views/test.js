const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
let data = new FormData();

data.append("reportFileName", "/commission/CP58.rpt");
data.append("reportDownFileName", "CP58_08022024");
data.append("viewType", "PDF");
data.append("V_MEMBERCODE", "519484");
data.append("V_YEAR", "2020");

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "http://172.16.42.53:8080/report/view-proc-submit.do",
  headers: {
    Cookie: "fileDownload=true",
    ...data.getHeaders(),
  },
  data: data,
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));

    fs.writeFile("./1232.pdf", response.data, function () {});
  } catch (error) {
    console.log(error);
  }
}

makeRequest();
