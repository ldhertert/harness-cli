import {expect, test} from '@oclif/test'

describe('k8s:get-service-account', () => {
  test
  .stdout()
  .command(['k8s:get-service-account'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['k8s:get-service-account', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
