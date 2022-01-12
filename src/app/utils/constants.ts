export const DefinedTableNames = {
  COMMENTS: 'comments'
};

type IDefinedTableNames = typeof DefinedTableNames;

export const DefinedSchemaNames = {
  ASSESSMENT_SERVICE: 'intelligentinnovation_assessment'
};

export const MIGRATION_TABLE_NAME = 'intelligentinnovation_assessment_migrations';

function addPath(): IDefinedTableNames {
  const obj = {} as any;
  Object.entries({ ...DefinedTableNames }).forEach(([key, value]) => {
    obj[key] = `${DefinedSchemaNames.ASSESSMENT_SERVICE}.${value}`;
  });
  return obj;
}

export const DefinedTableNamesPath = addPath();
