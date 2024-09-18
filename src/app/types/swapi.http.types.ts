import { People, Starships } from './resource.types';

export interface SWAPIResourceResponse<T extends People | Starships> {
  message: string;
  result: {
    description: string;
    properties: T;
    uid: number;
    __v: number;
    _id: string;
  };
}
