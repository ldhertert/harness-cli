import {expect, test} from '@oclif/test'

describe('cloud-provider:get', () => {
  test
  .stdout()
  .command(['cloud-provider:get'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cloud-provider:get', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
