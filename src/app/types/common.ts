import objection from 'objection';

type Overwrite<T, TKeys> = Pick<T, Exclude<keyof T, TKeys>>;

export type IObjectionRelationMappings = objection.RelationMappings | objection.RelationMappingsThunk;

export interface JSONSchemaExtra<T> extends Overwrite<objection.JSONSchema, 'required'> {
  properties: {
    [K in keyof T]: objection.JSONSchemaDefinition;
  };
  required?: (keyof T)[];
}

export interface ISuccessResponse<T = any> {
  status: 'success';
  message: string;
  data: T;
}

export interface IErrorResponse {
  status: 'error';
  code: string;
  message: string;
}
