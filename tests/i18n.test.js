import { describe, it, expect } from 'vitest'
import { t, translations } from '../src/i18n.js'

describe('i18n', () => {
  it('has FR and EN keys', () => {
    expect(Object.keys(translations)).toContain('fr')
    expect(Object.keys(translations)).toContain('en')
  })
})
