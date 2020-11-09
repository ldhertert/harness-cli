import {expect, test} from '@oclif/test'

describe('config-as-code:upsert', () => {
  test
  .stdout()
  .command(['config-as-code:upsert'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['config-as-code:upsert', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
