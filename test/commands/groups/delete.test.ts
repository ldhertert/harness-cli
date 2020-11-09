import {expect, test} from '@oclif/test'

describe('groups:delete', () => {
  test
  .stdout()
  .command(['groups:delete'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['groups:delete', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
