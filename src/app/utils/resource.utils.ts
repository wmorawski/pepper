import { People, ResourceType, Starships } from '../types/resource.types';

export const allowedResources: Lowercase<keyof typeof ResourceType>[] = [ResourceType.People, ResourceType.Starships];

export const resourceCommonAttributeMap: Partial<Record<ResourceType, string>> = {
  [ResourceType.People]: 'mass',
  [ResourceType.Starships]: 'crew',
};

export const resourceMinMaxIdMap: Partial<Record<ResourceType, [number, number]>> = {
  [ResourceType.People]: [1, 83],
  [ResourceType.Starships]: [2, 43],
};

export function resourceComparatorFn<T>(resource1: T, resource2: T): T | null;
export function resourceComparatorFn<T extends People>(resource1: T, resource2: T): T | null;
export function resourceComparatorFn<T extends Starships>(resource1: T, resource2: T): T | null;
export function resourceComparatorFn<T extends People | Starships>(resource1: T, resource2: T): T | null {
  const resource = resourceCommonAttributeMap[ResourceType.People]! in resource1 ? ResourceType.People : ResourceType.Starships;
  const key = resourceCommonAttributeMap[resource] as keyof typeof resource1;
  const val1 = resource1[key];
  const val2 = resource2[key];
  if (val1 === undefined || val2 === undefined) {
    throw new Error('You can only compare the same resources!');
  }
  const val1Transformed = (val1 as string)
    .replace('unknown', '0')
    .replace(',', '')
    .replace(/(\d*)+-(\d*)+/i, '$2');
  const val2Transformed = (val2 as string)
    .replace('unknown', '0')
    .replace(',', '')
    .replace(/(\d*)+-(\d*)+/i, '$2');
  const val1asNumber = Number(val1Transformed);
  const val2asNumber = Number(val2Transformed);
  if (val1asNumber === val2asNumber) return null;
  return val1asNumber > val2asNumber ? resource1 : resource2;
}

export const getRandomId = (min: number, max: number) => Math.floor(Math.random() * max) + min;
