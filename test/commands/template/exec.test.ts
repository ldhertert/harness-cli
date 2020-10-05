import {expect, test} from '@oclif/test'

describe('template:exec', () => {
  test
  .stdout()
  .command(['template:exec'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['template:exec', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
