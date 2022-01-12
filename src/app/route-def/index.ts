import { IRouteDefData } from 'inversify-postman-collection';

const routeDefinitionData: IRouteDefData = {
  // your route defs here
};

export function getRouteDefinitionData() {
  return { ...routeDefinitionData };
}
