const env = require("../../../environment")
const TestConfig = require("../../../tests/utilities/TestConfiguration")

const syncApps = jest.fn()
const syncRows = jest.fn()

jest.mock("../../usageQuotas/syncApps", () => ({ run: syncApps }) )
jest.mock("../../usageQuotas/syncRows", () => ({ run: syncRows }) )

const migrations = require("../../usageQuotas")

describe("run", () => {
  let config = new TestConfig(false)

  beforeEach(async () => {
    await config.init()
    env._set("USE_QUOTAS", 1)
  })

  afterAll(config.end)  

  it("runs the required migrations", async () => {
    await migrations.run()
    expect(syncApps).toHaveBeenCalledTimes(1)
    expect(syncRows).toHaveBeenCalledTimes(1)
  })
})
