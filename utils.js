import {fileURLToPath} from 'url';
import {dirname} from 'path';

const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
console.log(__dirname)
export default __dirname;
