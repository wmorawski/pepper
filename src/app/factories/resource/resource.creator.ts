import {Injectable} from "@angular/core";
import {IResource, Resource, ResourceType} from "../../types/resource.types";

@Injectable()
export abstract class ResourceCreator implements IResource {
  protected abstract resourceType: ResourceType;
  protected abstract commonAttribute: string;
  protected abstract properties: string[];
  protected abstract minMaxId: [number, number];
  protected abstract possibleIds: number[];
  protected abstract notExistingIds: number[];

  public abstract commonAttributeMapFn(resource: Resource): number;

  public getCommonAttribute() {
    return this.commonAttribute;

  }

  public getProperties(): string[] {
    return this.properties;
  }

  public getMinMaxId(): [number, number] {
    return this.minMaxId;
  }


  public comparatorFn(a: Resource, b: Resource): Resource {
    const aCommonAttribute = this.commonAttributeMapFn(a);
    const bCommonAttribute = this.commonAttributeMapFn(b);
    console.log('comparing', aCommonAttribute, 'to', bCommonAttribute);
    return aCommonAttribute > bCommonAttribute ? a : b;
  }

  public getPossibleIds(): number[] {
    return this.possibleIds.filter(id => !this.notExistingIds.includes(id));
  }

  public getRandomIds(): [number, number] {
    const possibleIds = [...this.getPossibleIds()];
    const randomIndex1 = Math.floor(Math.random() * possibleIds.length);
    const id1 = possibleIds[randomIndex1];
    possibleIds.splice(randomIndex1, 1);
    const id2 = possibleIds[Math.floor(Math.random() * possibleIds.length)];

    return [id1, id2];
  }

  public getResourceType(): ResourceType {
    return this.resourceType;
  }
}
