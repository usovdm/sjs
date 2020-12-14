function BaseTest(fn) {
  // will be used for taking screenshots during the exceptions
  // todo: move to separate module
  const onTestStart = async () => { }

  const onTestFinish = async () => { }

  const onTestFail = async (e) => {
    // console.log(e)
  }

  const baseTestRun = async () => {
    try {
      await onTestStart()
      await fn()
    } catch (e) {
      await onTestFail(e)
      throw e
    } finally {
      await onTestFinish()
    }
  }

  baseTestRun.origFn = fn

  return baseTestRun
}

module.exports = BaseTest
