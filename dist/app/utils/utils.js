"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceToObject = void 0;
function reduceToObject(list) {
    return list.reduce((map, obj) => {
        map[obj.id] = { ...obj };
        return map;
    }, {});
}
exports.reduceToObject = reduceToObject;
//# sourceMappingURL=utils.js.map