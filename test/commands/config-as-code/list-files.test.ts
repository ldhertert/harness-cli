import {expect, test} from '@oclif/test'

describe('config-as-code:list-files', () => {
  test
  .stdout()
  .command(['config-as-code:list-files'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['config-as-code:list-files', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
