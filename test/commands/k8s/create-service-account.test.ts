import {expect, test} from '@oclif/test'

describe('k8s:create-service-account', () => {
  test
  .stdout()
  .command(['k8s:create-service-account'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['k8s:create-service-account', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
