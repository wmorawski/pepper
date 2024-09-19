import {ResourceType} from "../../types/resource.types";
import {inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {PeopleFactory} from "./people.factory";
import {StarshipsFactory} from "./starships.factory";

export const resourceFactory = () => {
  const resourceType = inject(ActivatedRoute).snapshot.params['resource'] as ResourceType;
  switch (resourceType) {
    case ResourceType.People:
      return new PeopleFactory();
    case ResourceType.Starships:
      return new StarshipsFactory();
    default:
      throw new Error("Not implemented factory for this resource");
  }
}

