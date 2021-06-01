/* eslint-disable  */
const fs = require('fs');
require('dotenv').config()

function buildDefs(result) {
    const queries = result.data.__schema.queryType.fields
    queries.forEach(query => {
        const map = {
            name: query.name,
            description: query.description,
            args: query.args.map(arg => {
                const typeInfo = parseType(arg.type)
                if (arg.name === 'limit') {
                    typeInfo.nullable = true
                    arg.defaultValue = 100
                }
                return {
                    name: arg.name,
                    defaultValue: arg.defaultValue,
                    type: typeInfo.type,
                    nullable: typeInfo.nullable,
                    collection: typeInfo.collection,
                }
            })
        }

        const formattedArgs = map.args.map(arg => {
            let formattedType = arg.collection ? `[${arg.type}]`: arg.type
            if (!arg.nullable) {
                formattedType = formattedType + '!'
            }
            return `$${arg.name}: ${formattedType}${ arg.defaultValue ? ' = ' + arg.defaultValue : '' }`
        }).join(", ")

        const formattedArgs2 = map.args.map(arg => {
            return `${arg.name}: $${arg.name}`
        }).join(", ")

        let body =  
`   nodes {
      id
      name
    }`
        if (map.args.filter(arg => arg.name === 'limit').length > 0) {
            body = 
`${body}

    pageInfo {
      hasMore
    }`
        }
        const template = 
`query ${map.name}(${formattedArgs}) {
  result: ${map.name}(${formattedArgs2}) {
${body}
  }
}`

        fs.writeFileSync(__dirname + `/../generated/queries/${map.name}.graphql`, template)

        
        // console.log(JSON.stringify(map, null, 2))
        // console.log(query.name)
    })
}

function parseType(type) {
    let returnValue = {
        type: null,
        nullable: true,
        collection: false,
    }
    if (type.kind === 'SCALAR' || type.kind === 'INPUT_OBJECT') {
        returnValue.type = type.name
    } else if (type.kind === 'NON_NULL') {
        returnValue = parseType(type.ofType)
        returnValue.nullable = false
    } else if (type.kind === 'LIST') {
        returnValue = parseType(type.ofType)
        returnValue.collection = true
    }  else if (type.kind === 'ENUM') {
        //need better introspection queries
        returnValue.type = type.name
    } else {
        return type
    }

    return returnValue
}

function fetchSchema() {

    var axios = require('axios');
    var data = JSON.stringify({
        query: `
        {
            __schema {
              queryType {
                name
                fields {
                  name
                  description
                  type {
                    ...TypeRef
                  }
                  args {
                    name
                    defaultValue
                    type {
                      ...TypeRef
                    }
                  }
                }
              }
            }
          }
          
          fragment TypeRef on __Type {
            kind
            name
            possibleTypes {
              name
            }
            enumValues {
              name
              description
            }
            ofType {
              kind
              name
              enumValues {
                name
                description
              }
              possibleTypes {
                name
              }
              ofType {
                kind
                name
                possibleTypes {
                  name
                }
                ofType {
                  kind
                  name
                }
              }
            }
          }
          
        `,
        variables: {}
    });

    var config = {
        method: 'post',
        url: 'https://app.harness.io/gateway/api/graphql?accountId=Sy3KVuK1SZy2Z7OLhbKlNg',
        headers: {
            'x-api-key': process.env.HARNESS_API_KEY,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            buildDefs(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}

fetchSchema()