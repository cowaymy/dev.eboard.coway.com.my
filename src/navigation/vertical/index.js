import commission from "./commission";
import performance from "./performance";
import sales from "./sales";
import profile from "./profile";

export default [...commission, ...performance, ...sales, ...profile];

// import  comApi  from '../../api/index';

//   export default async function () {
//     console.log("========================navigation.......")

//     const list = await comApi.getMenuList();

//     console.log(list)

//     return  list;
// }
