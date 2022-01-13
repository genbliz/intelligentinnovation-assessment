import { IRouteDefData } from 'inversify-postman-collection';
import book from './book';

const routeDefinitionData: IRouteDefData = {
  BookController: book
};

export function getRouteDefinitionData() {
  return { ...routeDefinitionData };
}
