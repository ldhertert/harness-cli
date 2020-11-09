import {expect, test} from '@oclif/test'

describe('cloud-provider:delete', () => {
  test
  .stdout()
  .command(['cloud-provider:delete'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cloud-provider:delete', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
