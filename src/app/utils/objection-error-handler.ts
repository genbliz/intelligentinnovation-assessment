import {
  ValidationError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  // CheckViolationError,
  DataError
} from 'objection';

export function formatObjectionErrors(err: unknown): string | null {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        return err.message;
      case 'RelationExpression':
        return `Data Relation error occured`;
    }
  }
  if (err instanceof UniqueViolationError) {
    return `Unique key for: ${err.columns[0]}, violated.`;
  }
  if (err instanceof DataError) {
    return `Data format error occured`;
  }
  if (err instanceof ForeignKeyViolationError) {
    return `Foreign key violation occured.`;
  }
  if (err instanceof NotNullViolationError) {
    return `Value for: ${err.column}, cannot be null.`;
  }
  if (err instanceof ConstraintViolationError) {
    return `Data constraint violated`;
  }
  // if (err instanceof CheckViolationError) {
  //   return err.table;
  // }
  return null;
}
