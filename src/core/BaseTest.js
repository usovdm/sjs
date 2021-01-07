function BaseTest(fn) {
  // will be used for taking screenshots during the exceptions
  // todo: move to separate module
  const onTestStart = async () => { }

  const onTestFinish = async () => { }

  const onTestFail = async (e) => {
    console.log('on error')
    // console.log(e)
  }
  beforeEach(async () => {
    // console.log('beforeEach BaseTest')
  })

  afterEach(async () => {
    // console.log('afterEach BaseTest')
  })

  const baseTestRun = function () {
    try {
      await onTestStart()
      await fn.call(this)
    } catch (e) {
      await onTestFail(e)
      throw e
    } finally {
      await onTestFinish()
    }
  }

  this.origFn = fn
  baseTestRun.origFn = fn

  return baseTestRun.bind(this)
}

module.exports = BaseTest
