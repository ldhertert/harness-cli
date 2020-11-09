import {expect, test} from '@oclif/test'

describe('config-as-code:delete', () => {
  test
  .stdout()
  .command(['config-as-code:delete'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['config-as-code:delete', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
