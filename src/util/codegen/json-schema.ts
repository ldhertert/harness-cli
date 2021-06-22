import { ApplicationByNameArguments, ApplicationByName } from "./out";
import Ajv from "ajv"
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import * as fs from 'fs';


// generate GraphQL Schema file from instrospection query
function generateGraphQLSchema() {
    // bash
    // API_KEY=''
    // quicktype --http-header "x-api-key: $API_KEY" \
    //        --graphql-introspect "https://app.harness.io/gateway/api/graphql?accountId=Sy3KVuK1SZy2Z7OLhbKlNg" \
    //        --graphql-schema harness.gqlschema
}

function generateTypescriptTypesFromJSONSchema() {
    // quicktype --src-lang schema --lang typescript jsonSchema.json -o types.ts --nice-property-names --just-types -t HarnessApi --alphabetize-properties 
}

// Generate JSON Schema file from GraphQL Schema
function generateJsonSchemaFromGraphQL() {
    const options = {
        ignoreInternals: true,
        nullableArrayItems: true
    }

    const introspection = JSON.parse(fs.readFileSync('harness.gqlschema', { encoding: 'utf-8' })).data

    const jsonSchema = fromIntrospectionQuery(introspection, options);
    console.log(JSON.stringify(jsonSchema, null, 4))
}

// Type safe JSON validation from JSON Schema file
function validateJson() {
    const schema = require('./jsonSchema.json');
    schema['$schema'] = undefined
    schema.type = "object"

    const ajv = new Ajv()
    ajv.addSchema(schema)

    type argType = ApplicationByName['arguments']
    const validate = ajv.getSchema<argType>("#/properties/Query/properties/applicationByName/properties/arguments");

    const json = `
    {
        "name": "hi",
        "name3": "hi"
    }`

    const data = JSON.parse(json)

    if (validate(data)) {
        console.log(data)
    } else {
        console.log(validate.errors)
    }
}
