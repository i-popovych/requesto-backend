import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PaginationInterface } from 'src/types/pagination';

const DEFAULT_LIMIT = 20;

// default pagination ?page=2&perPage=1&searchValue=s
export const GetPagination = createParamDecorator(
  (data, ctx: ExecutionContext): PaginationInterface => {
    const req: Request = ctx.switchToHttp().getRequest();

    const paginationParams: PaginationInterface = {
      page: 1,
      perPage: DEFAULT_LIMIT,
      sort: [],
      searchValue: '',
    };
    const page = req.query.page ? parseInt(req.query.page.toString()) : 0;
    paginationParams.page = page;
    paginationParams.skip = page === 1 ? 0 : page * DEFAULT_LIMIT;
    if (page === 0) {
      paginationParams.perPage = 0;
      paginationParams.skip = 0;
    } else {
      const perPage = req.query.perPage
        ? parseInt(req.query.perPage.toString())
        : DEFAULT_LIMIT;
      paginationParams.perPage = perPage;
      paginationParams.skip = page === 1 ? 0 : page * perPage - perPage;
    }

    if (req.query.sort) {
      const sortArray = req.query.sort.toString().split(',');
      paginationParams.sort = sortArray.map((sortItem) => {
        const sortBy = sortItem[0];
        switch (sortBy) {
          case '-':
            return {
              field: sortItem.slice(1),
              by: 'DESC',
            };
          case '+':
            return {
              field: sortItem.slice(1),
              by: 'ASC',
            };
          default:
            return {
              field: sortItem.trim(),
              by: 'ASC',
            };
        }
      });
    }

    if (req.query.filters) {
      paginationParams.filters = JSON.parse(req.query.filters as string);
    }
    if (req.query.searchValue) {
      paginationParams.searchValue = String(req.query.searchValue);
    }

    if (req.query.dateRange) {
      paginationParams.dateRange = JSON.parse(req.query.dateRange as string);
    }

    return paginationParams;
  },
);
