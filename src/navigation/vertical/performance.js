import { mdiMessageTextOutline, mdiFileDownloadOutline } from "@mdi/js";

export default [
  {
    //icon: mdiCashCheck,
    text: "Performance",
    sublinks: [
      {
        text: "CODE",
        to: "",
        sublinks_2: [
          {
            text: "cody Performance",
            to: "/performance/codyPerformance",
            icon: mdiFileDownloadOutline,
          },
        ],
      },
      {
        text: "SALES",
        to: "",
        sublinks_2: [
          {
            text: "DST Performance",
            to: "/performance/DSTPerformance",
            icon: mdiFileDownloadOutline,
          },
        ],
      },
      {
        text: "eKeyin-Performance",
        to: "/performance/eKeyinPerformance",
        icon: mdiMessageTextOutline,
      },
    ],
  },
];
