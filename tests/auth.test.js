import { describe, it, expect, beforeEach } from 'vitest'
import { getUser } from '../src/hooks/useAuth.js'

describe('auth mock', () => {
  beforeEach(()=> localStorage.clear())
  it('starts unauthenticated', () => {
    expect(getUser()).toBe(null)
  })
})
