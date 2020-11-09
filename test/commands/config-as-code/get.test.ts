import {expect, test} from '@oclif/test'

describe('config-as-code:get', () => {
  test
  .stdout()
  .command(['config-as-code:get'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['config-as-code:get', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
