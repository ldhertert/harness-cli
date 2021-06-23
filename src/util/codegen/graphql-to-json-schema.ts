import {
    buildSchema,
    graphqlSync,
    getIntrospectionQuery,
    IntrospectionQuery
} from 'graphql';

import * as fs from 'fs';

import { fromIntrospectionQuery } from 'graphql-2-json-schema';

const options = {
  ignoreInternals: true,
  nullableArrayItems: true
}

const gqlSchema = fs.readFileSync(process.argv[2], { encoding: 'utf-8' })
const graphqlSchemaObj = buildSchema(gqlSchema);
const introspection = graphqlSync(graphqlSchemaObj, getIntrospectionQuery()).data as IntrospectionQuery;

const jsonSchema = fromIntrospectionQuery(introspection, options);
console.log(JSON.stringify(jsonSchema, null, 4))
