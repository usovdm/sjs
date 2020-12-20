function BaseTest(fn) {
  // will be used for taking screenshots during the exceptions
  // todo: move to separate module
  const onTestStart = async () => { }

  const onTestFinish = async () => { }

  const onTestFail = async (e) => {
    // console.log(e)
  }
  let num = 0
  beforeEach(async () => {
    num += 1
    this.num = num
    console.log(num)
    console.log('beforeEach BaseTest')
  })

  afterEach(async () => {
    console.log('afterEach BaseTest')
  })

  const baseTestRun = function () {
    fn.call(this)
    return
    // try {
    //   await onTestStart()
    //   await fn.call(this)
    // } catch (e) {
    //   await onTestFail(e)
    //   throw e
    // } finally {
    //   await onTestFinish()
    // }
  }

  this.origFn = fn
  baseTestRun.origFn = fn

  return baseTestRun.bind(this)
}

module.exports = BaseTest
