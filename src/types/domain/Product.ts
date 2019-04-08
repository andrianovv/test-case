import { Id } from 'Types/Id';

export class Product {
  id: Id;
  name: string;
  ratePlans: RatePlan[];
}

export type RatePlan = {
  id: Id;
  name: string;
  price: number;
};
