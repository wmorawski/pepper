import {ResourceType} from '../types/resource.types';

export const allowedResources: Lowercase<keyof typeof ResourceType>[] = [ResourceType.People, ResourceType.Starships];
