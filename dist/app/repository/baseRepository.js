"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const errors_1 = require("../utils/errors");
let BaseRepository = class BaseRepository extends errors_1.FriendlyErrorUtil {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "DEFAULT_PAGING_SIZE", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 10
        });
        Object.defineProperty(this, "DEFAULT_PAGING_PAGE", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
    }
    _baseUtil_GetPagingParamsOnly({ pageSize, currentPage, totalCount, pageCount } = {}) {
        const size = Number(pageSize || this.DEFAULT_PAGING_SIZE);
        const page = Number(currentPage || this.DEFAULT_PAGING_PAGE);
        const total = Number(totalCount || 0);
        const page_count = Number(pageCount || 0);
        return {
            results: [],
            pagination: {
                previous_page: page < 2 ? page : page - 1,
                current_page: page,
                next_page: size * page < total ? page + 1 : page,
                size: size,
                page_count,
                total
            }
        };
    }
    async _getDistinctCountOnField({ countQuery, fieldName }) {
        const countResult = await countQuery.countDistinct(fieldName, { as: 'total' });
        return Number(countResult?.[0]?.['total'] ?? 0);
    }
    async _baseUtil_GetPagingAndResult({ mainQuery, countQuery, pageSize, currentPage }) {
        const countResult = await countQuery.count('id', { as: 'total' });
        const totalCount = Number(countResult?.[0]?.['total'] ?? 0);
        return this._baseUtil_GetPagingAndResultWithDefinedCount({
            mainQuery,
            totalCount,
            pageSize,
            currentPage
        });
    }
    async _baseUtil_GetPagingAndResultWithDefinedCount({ mainQuery, totalCount, pageSize, currentPage }) {
        const size = Number(pageSize || this.DEFAULT_PAGING_SIZE);
        const page = Number(currentPage || this.DEFAULT_PAGING_PAGE);
        const total = Number(totalCount);
        const page_count = Math.ceil(total / size);
        const results = await mainQuery.limit(size).offset((page - 1) * size);
        if (!results?.length) {
            return {
                results,
                pagination: {
                    previous_page: page < 2 ? page : page - 1,
                    current_page: page,
                    next_page: size * page < total ? page + 1 : page,
                    size: size,
                    page_count: 0,
                    total: 0
                }
            };
        }
        return {
            results,
            pagination: {
                previous_page: page < 2 ? page : page - 1,
                current_page: page,
                next_page: size * page < total ? page + 1 : page,
                size: size,
                page_count,
                total
            }
        };
    }
};
BaseRepository = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], BaseRepository);
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map