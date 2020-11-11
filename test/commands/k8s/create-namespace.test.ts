import {expect, test} from '@oclif/test'

describe('k8s:create-namespace', () => {
  test
  .stdout()
  .command(['k8s:create-namespace'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['k8s:create-namespace', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
