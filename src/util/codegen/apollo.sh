
URL="https://app.harness.io/gateway/api/graphql?accountId=Sy3KVuK1SZy2Z7OLhbKlNg"  
HEADER="X-API-KEY: xxxx"

# Generate GraphQL Schema in SDL format from endpoint
apollo client:download-schema schema.graphql --endpoint $URL --header $HEADER

# Generate GraphQL Schema in JSON format from endpoint
apollo client:download-schema schema.json --endpoint $URL --header $HEADER

# JSON file that contains all operations along with the queries
apollo client:codegen  --endpoint $URL --header $HEADER --target=json-modern --includes './queries/*.graphql' ./types.json

# Create json schema from GraphQL schema
ts-node graphql-to-json-schema.ts ./schema.graphql > json-schema.json

# Create typescript types file from JSON Schema
quicktype --src-lang schema --lang typescript json-schema.json -o types.ts --nice-property-names --just-types -t HarnessApi
# apollo client:codegen  --endpoint $URL --header $HEADER --target=typescript --includes './queries/*.graphql' --outputFlat ./types.ts 
