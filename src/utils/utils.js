/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
module.exports.isExternal = function (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * @param {string} str
 * @returns {Boolean}
 */
module.exports.validUsername = function (str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
};

/**
 * @param {string} url
 * @returns {Boolean}
 */
module.exports.validURL = function (url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
};

/**
 * @param {string} str
 * @returns {Boolean}
 */
module.exports.validLowerCase = function (str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
};

/**
 * @param {string} str
 * @returns {Boolean}
 */
module.exports.validUpperCase = function (str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
};

/**
 * @param {string} str
 * @returns {Boolean}
 */
module.exports.validAlphabets = function (str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
};

/**
 * @param {string} email
 * @returns {Boolean}
 */
module.exports.validEmail = function (email) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

/**
 * @param {string} str
 * @returns {Boolean}
 */
module.exports.isString = function (str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
};

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
module.exports.isArray = function (arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
};

/**
 * @param {string} str
 * @returns {}
 */
module.exports.checkNull = function (str) {
  if (typeof str === "undefined" || str === null) {
    return 0;
  }
  return str;
};

/**
 * @param {string} str
 * @returns {}
 */
module.exports.isEmptyResult = function (obj) {
  if (typeof obj === "undefined" || obj === null || obj == "") {
    return true;
  }
  return false;
};

module.exports.getMonthName = function () {
  return new Date().toLocaleDateString("en-US", { month: "short" });
};
// Format: dd/mm/yyyy
module.exports.getDateOnly = function () {
  return new Date().toLocaleDateString("en-GB");
};

// Format: dd/mm/yyyy
module.exports.getDate = function () {
  return new Date().getDate();
};


/**
 * Escape HTML
 * @param {*} unsafe 
 * @returns 
 */
module.exports.escapeHtml = function (unsafe) {
  return  unsafe.replace(
          /[&<>'`?"]/g,
          tag =>
            ({
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              "'": '&#39;',
              '"': '&quot;',
              '`': '&#96',
              '?': '&#63;',
            }[tag] || tag));
};

/**
 * Unescape HTML
 * @param {*} unsafe 
 * @returns 
 */
module.exports.unescapeHTML  = function (unsafe) {
  return  unsafe.replace(
              /&amp;|&lt;|&gt;|&#39;|&quot;/g,
              tag =>
                ({
                  '&amp;': '&',
                  '&lt;': '<',
                  '&gt;': '>',
                  '&#39;': "'",
                  '&quot;': '"'
                }[tag] || tag));
}

// module.exports.pdfToImg = function (pdf) {
//   return new Promise((r) => {
//     const loadingTask = pdfjsLib.getDocument(pdf);
//     loadingTask.promise.then(function (pdf) {
//       renderPage(pdf, 1, []).then((col) => r(col));
//     });
//   });

//   function renderPage(pdf, pageNum, collect) {
//     return new Promise((r) => {
//       pageRendering = true;
//       var pageRendering = false,
//         scale = 0.8;
//       pdf.getPage(pageNum).then(function (page) {
//         let viewport = page.getViewport({ scale: scale });
//         let canvas = document.createElement("canvas");
//         let ctx = canvas.getContext("2d");
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         let renderTask = page.render({
//           canvasContext: ctx,
//           viewport: viewport,
//         });

//         renderTask.promise.then(function () {
//           if (pageNum < pdf._pdfInfo.numPages) {
//             renderPage(pdf, pageNum + 1, [...collect, canvas.toDataURL()]).then(
//               (col) => {
//                 r(col);
//               }
//             );
//           } else {
//             r(collect);
//           }
//           canvas.remove();
//         });
//       });
//     });
//   }
// };
