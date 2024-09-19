import { ResourceCreator } from './resource.creator';
import { People, ResourceType } from '../../types/resource.types';

export class PeopleFactory extends ResourceCreator {
  protected readonly resourceType = ResourceType.People;
  protected readonly commonAttribute: keyof People = 'mass';
  protected readonly properties: (keyof People)[] = ['birth_year', 'eye_color', 'gender', 'hair_color', 'height', 'mass'];
  protected readonly minMaxId: [number, number] = [1, 83];
  protected readonly possibleIds = Array.from({ length: 82 }, (_, i) => i + 1);
  protected readonly notExistingIds = [17];

  public commonAttributeMapFn(people: People): number {
    return people.mass === 'unknown' ? 0 : parseInt(people.mass, 10);
  }
}
