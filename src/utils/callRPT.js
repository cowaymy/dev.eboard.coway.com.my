import Vue from "vue";
import bus from "./bus";

let fileName = "";

function callRPT(requestOptions) {
  console.log(requestOptions);

  var myHeaders = new Headers();
  myHeaders.append("Cookie", "fileDownload=true");
  requestOptions.headers = myHeaders;
  fileName = requestOptions.fileName;

  let rpturl = "https://etrustdev.my.coway.com";

  //start spinner
  bus.$emit("start:spinner");

  fetch(`${rpturl}/report/${requestOptions.rptFuncViewType}`, requestOptions)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      downloadFile(blob);
    })
    .catch((error) => {
      Vue.toasted
        .error("There was an report server issue [" + error + "]", {
          icon: "error",
          position: "bottom-right",
          action: {
            text: "Close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        })
        .goAway(3500);
      bus.$emit("end:spinner");
    });
}

function downloadFile(blob, name = fileName) {
  const href = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display:none",
    download: name,
  });
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(href);
  a.remove();
  Vue.toasted
    .success("It has been download file", {
      icon: "check",
      position: "bottom-right",
      action: {
        text: "Close",
        onClick: (e, toastObject) => {
          this.btIsActive = true;
          toastObject.goAway(0);
        },
      },
    })
    .goAway(2500);

  bus.$emit("end:spinner");
}

export default {
  callRPT,
};
