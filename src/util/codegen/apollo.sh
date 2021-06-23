
URL="https://app.harness.io/gateway/api/graphql?accountId=Sy3KVuK1SZy2Z7OLhbKlNg"  
HEADER="X-API-KEY: xxxx"

apollo client:download-schema schema.graphql --endpoint $URL --header $HEADER
apollo client:download-schema schema.json --endpoint $URL --header $HEADER

apollo client:codegen  --endpoint $URL --header $HEADER --target=json-modern --includes './queries/*.graphql' ./types.json
apollo client:codegen  --endpoint $URL --header $HEADER --target=typescript --includes './queries/*.graphql' --outputFlat ./types.ts 

# Create json schema from GraphQL schema
ts-node graphql-to-json-schema.ts ./schema.graphql > json-schema.json
