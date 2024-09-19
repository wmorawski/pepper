import { ResourceCreator } from './resource.creator';
import { ResourceType, Starships } from '../../types/resource.types';

export class StarshipsFactory extends ResourceCreator {
  protected readonly resourceType = ResourceType.Starships;
  protected readonly commonAttribute: keyof Starships = 'crew';
  protected readonly properties: (keyof Starships)[] = ['model', 'starship_class', 'manufacturer', 'cost_in_credits', 'hyperdrive_rating', 'crew'];
  protected readonly minMaxId: [number, number] = [2, 75];
  protected readonly possibleIds = Array.from({ length: 74 }, (_, i) => i + 1);
  protected readonly notExistingIds = [
    4, 6, 7, 8, 14, 16, 18, 19, 20, 24, 25, 26, 30, 33, 34, 35, 36, 37, 38, 42, 44, 45, 46, 50, 51, 53, 54, 55, 56, 57, 60, 62, 67, 69, 70, 71, 72, 73,
  ];

  public commonAttributeMapFn(starships: Starships): number {
    const crew = starships.crew;
    if (crew === 'unknown') return 0;
    if (crew.includes('-')) {
      const crewArray = crew.split('-');
      return parseInt(crewArray[1], 10);
    }
    if (crew.includes(',')) {
      return parseInt(crew.replaceAll(',', ''), 10);
    }

    return parseInt(crew, 10);
  }
}
