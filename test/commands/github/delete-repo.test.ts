import {expect, test} from '@oclif/test'

describe('github:delete-repo', () => {
  test
  .stdout()
  .command(['github:delete-repo'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['github:delete-repo', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
