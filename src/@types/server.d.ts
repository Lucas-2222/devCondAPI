import { Request} from  'express';

declare module 'express-serve-static-core' {
  type CustomValue = { customValue:  string};
  export interface Request extends CustomValue {}
}