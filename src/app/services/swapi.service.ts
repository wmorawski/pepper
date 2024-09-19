import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Resource, ResourceType} from "../types/resource.types";
import {SWAPIResourceResponse} from "../types/swapi.http.types";

@Injectable({
  providedIn: 'root'
})
export class SWAPIService {
  private readonly baseUrl = 'https://swapi.dev/api/';

  constructor(private httpClient: HttpClient) {
  }

  public fetchResource(resource: ResourceType, id: number) {
    return this.httpClient.get<SWAPIResourceResponse<Resource>>(`${this.baseUrl}/${resource}/${id}`);
  }
}
