export function reduceToObject(list: any): any {
  return list.reduce((map: any, obj: any) => {
    map[obj.id] = { ...obj };
    return map;
  }, {});
}
