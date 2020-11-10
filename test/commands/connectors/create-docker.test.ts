import {expect, test} from '@oclif/test'

describe('connectors:create-docker', () => {
  test
  .stdout()
  .command(['connectors:create-docker'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['connectors:create-docker', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
