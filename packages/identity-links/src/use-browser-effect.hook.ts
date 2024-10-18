/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import type { EffectCallback } from 'react'
import type { DependencyList } from 'react'

import { useEffect }           from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const useBrowserEffect = (effect: EffectCallback, deps?: DependencyList) => {
  if (typeof window === 'undefined') {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  return useEffect(effect, deps)
}
