import { PipelineStage } from 'mongoose';
import { DateRange, SortingInterface } from 'src/types/pagination';

export const searchByField = (field: string, value: string) => {
  if (!value) return {};

  return {
    [field]: {
      $regex: `(?i)(?=${String(value)})`,
    },
  };
};

export const searchByFields = (fields: string[], value: string) => {
  if (!value) return {};

  const regex = new RegExp(value, 'i');
  const or = fields.map((field) => ({ [field]: regex }));

  return { $or: or };
};

export const searchWithSpacingBySeparateFields = (
  fields: string[],
  value: string,
) => {
  if (!value) return {};

  const terms = value.trim().split(/\s+/);
  const or = terms.flatMap((term) =>
    fields.map((field) => ({ [field]: new RegExp(term, 'i') })),
  );

  return { $or: or };
};

export const getSearchByFieldsObject = (
  fields: string[],
  value: string,
  filter: Record<string, any>,
) => {
  return {
    ...filter,
    ...searchByFields(fields, value),
  };
};

export const getSortingObject = (
  sorting: SortingInterface[],
  renameFields?: { [key: string]: string },
): Record<string, 1 | -1> => {
  const sortObj = {};

  sorting.forEach((sort) => {
    const filedName = renameFields?.[sort.field] || sort.field;

    sortObj[filedName] = sort.by === 'ASC' ? 1 : -1;
  });

  return sortObj;
};

export const assignSortingObjectToPipeline = (
  pipeline: PipelineStage[],
  sorting: SortingInterface[],
  renameFields?: { [key: string]: string },
) => {
  const pipelineCopy = [...pipeline];
  const sortObj = getSortingObject(sorting, renameFields);

  if (Object.keys(sortObj).length) {
    pipelineCopy.push({ $sort: sortObj });
  }

  return pipelineCopy;
};

export const getDateQuery = (from?: Date, to?: Date) => {
  if (from && to) {
    return {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  } else if (from) {
    return { $gte: new Date(from) };
  } else if (to) {
    return { $lte: new Date(to) };
  }

  return {};
};

export const getDateFilter = (dateRange: DateRange[]) => {
  if (!dateRange || !dateRange?.length) return null;

  const filter = {} as Record<string, any>;

  dateRange.forEach((date) => {
    if (!date.value.from && !date.value.to) return;

    filter[date.field] = getDateQuery(date.value.from, date.value.to);
  });

  return Object.keys(filter).length === 0 ? null : filter;
};
