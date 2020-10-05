import {expect, test} from '@oclif/test'

describe('git:clone', () => {
  test
  .stdout()
  .command(['git:clone'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['git:clone', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
