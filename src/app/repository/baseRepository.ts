import { injectable } from 'inversify';
import { FriendlyErrorUtil } from '../utils/errors';
import { QueryBuilder } from 'objection';

@injectable()
export class BaseRepository extends FriendlyErrorUtil {
  private readonly DEFAULT_PAGING_SIZE = 10;
  private readonly DEFAULT_PAGING_PAGE = 1;

  protected _baseUtil_GetPagingParamsOnly({
    pageSize,
    currentPage,
    totalCount,
    pageCount
  }: {
    pageSize?: number | null;
    currentPage?: number | null;
    totalCount?: number | null;
    pageCount?: number | null;
  } = {}) {
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

  protected async _getDistinctCountOnField({
    countQuery,
    fieldName
  }: {
    countQuery: QueryBuilder<any>;
    fieldName: string;
  }) {
    const countResult: any[] = await countQuery.countDistinct(fieldName, { as: 'total' });
    return Number(countResult?.[0]?.['total'] ?? 0);
  }

  protected async _baseUtil_GetPagingAndResult<T = any>({
    mainQuery,
    countQuery,
    pageSize,
    currentPage
  }: {
    countQuery: QueryBuilder<any>;
    mainQuery: QueryBuilder<any>;
    currentPage?: number | null;
    pageSize?: number | null;
  }) {
    const countResult: any[] = await countQuery.count('id', { as: 'total' });
    const totalCount = Number(countResult?.[0]?.['total'] ?? 0);

    return this._baseUtil_GetPagingAndResultWithDefinedCount<T>({
      mainQuery,
      totalCount,
      pageSize,
      currentPage
    });
  }

  protected async _baseUtil_GetPagingAndResultWithDefinedCount<T = any>({
    mainQuery,
    totalCount,
    pageSize,
    currentPage
  }: {
    totalCount: number;
    mainQuery: QueryBuilder<any>;
    currentPage?: number | null;
    pageSize?: number | null;
  }) {
    const size = Number(pageSize || this.DEFAULT_PAGING_SIZE);
    const page = Number(currentPage || this.DEFAULT_PAGING_PAGE);
    //
    const total = Number(totalCount);
    const page_count = Math.ceil(total / size);
    const results: T[] = await mainQuery.limit(size).offset((page - 1) * size);

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
}
