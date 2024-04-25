
import  netsales from './performance/netsales.js';
import  active   from './performance/active.js';
import  keyin    from './performance/keyin.js';
import  shi      from './performance/shi.js';

const performanceApi = {
  ...netsales,
  ...active,
  ...keyin,
  ...shi
};


export default performanceApi

