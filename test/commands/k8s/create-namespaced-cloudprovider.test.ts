import {expect, test} from '@oclif/test'

describe('k8s:create-namespaced-cloudprovider', () => {
  test
  .stdout()
  .command(['k8s:create-namespaced-cloudprovider'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['k8s:create-namespaced-cloudprovider', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
