import { expect, test } from '@oclif/test'
import { Harness } from '../../../src/providers/harness/harness-api-client'

describe('application:create', function () {
    this.timeout(10000)

    after(async function (done) {
        const harness = new Harness()
        await harness.init()
        await harness.applications.delete('mocha-app')
        done()
    })

    test
        .stdout()
        .command(['application:create', '--name', 'mocha-app'])
        .it('runs hello', async function (ctx) {
            expect(ctx.stdout).to.contain('"name": "mocha-app"')
        })
})
