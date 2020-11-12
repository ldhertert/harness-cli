import {expect, test} from '@oclif/test'

describe('k8s:cluster-info', () => {
  test
  .stdout()
  .command(['k8s:cluster-info'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['k8s:cluster-info', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
