export const enum ResourceType {
  Root = 'root',
  Films = 'films',
  People = 'people',
  Planets = 'planets',
  Species = 'species',
  Starships = 'starships',
  Vehicles = 'vehicles',
}

export interface People {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

export interface Starships {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string;
  url: string;
  created: string;
  edited: string;
}

export type Resource = People | Starships;

export interface IResource {
  getResourceType(): ResourceType;

  getProperties(): string[];

  getCommonAttribute(): string;

  getMinMaxId(): [number, number];

  getPossibleIds(): number[];

  comparatorFn(a: Resource, b: Resource): Resource;

  commonAttributeMapFn(resource: Resource): number;

  getRandomIds(): [number, number]
}
