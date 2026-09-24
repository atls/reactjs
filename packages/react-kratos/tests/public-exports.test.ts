import assert      from 'node:assert/strict'
import { test }    from 'node:test'

import * as Kratos from '../src/index.js'

test('exports the supported React API without vendor SDK symbols', () => {
  const supportedExports = [
    'FlowInputNode',
    'FlowMessages',
    'FlowNodeMessages',
    'FlowSubmit',
    'LoginNativeFlow',
    'RegistrationNativeFlow',
    'SdkProvider',
    'useSdk',
  ]

  for (const exportedName of supportedExports) {
    assert.ok(exportedName in Kratos, `Missing ${exportedName}`)
  }

  assert.ok(!('FrontendApi' in Kratos))
  assert.ok(!('Configuration' in Kratos))
  assert.ok(!('IdentityApi' in Kratos))
})
