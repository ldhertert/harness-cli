/* eslint-disable */

import { parse } from "path"

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()


function parseVar(str: string) {
    const doubleQuotedKey = /^"(.*?)"=(.*)/.exec(str)
    const singleQuotedKey = /^'(.*?)'=(.*)/.exec(str)
    const unQuotedKey = /^(.*?)=(.*)/.exec(str)
    const match = doubleQuotedKey || singleQuotedKey || unQuotedKey
    if (!match || match.length !== 3) {
        throw new Error(`Unable to parse variable parameter: ${str}`)
    }
    const key = match[1]
    const doubleQuotedValue = /^"(.*)"/.exec(match[2])
    const singleQuotedValue = /^'(.*)'/.exec(match[2])
    const valueMatch = doubleQuotedValue || singleQuotedValue
    const value = valueMatch && valueMatch.length === 2 ? valueMatch[1] : match[2]
    return { key, value }
}

async function runThis(): Promise<void> {   
    parseVar(`test=hi`)
    parseVar(`'test'=hi`)
    parseVar(`"test"=hi`)
    parseVar(`"test"='hi'`)
    parseVar(`"test"="hi"`)

    
    return Promise.resolve()    
}

runThis()
    .then(() => console.log('done'))
    .catch((error: any) => { throw error })
