import { fireEvent, render, waitFor } from '@testing-library/react'
import * as React from 'react'
import { TestProvider } from 'src/_page-tests/test-utils'
import { agree, disagree } from 'src/analytics/analytics'
import CookieConsentWithEmotion from 'src/header/CookieFolder/CookieConsentWithEmotion'
import { initSentry } from 'src/utils/sentry'

jest.mock('src/utils/sentry', () => {
  return { initSentry: jest.fn() }
})

jest.mock('src/analytics/analytics', () => {
  return { agree: jest.fn(), disagree: jest.fn(), showVisitorCookieConsent: jest.fn(() => true) }
})

describe('CookieConsent', () => {
  describe('when agree', () => {
    it('initializes Sentry', async () => {
      const { getByText, queryByText } = render(
        <TestProvider>
          <CookieConsentWithEmotion />
        </TestProvider>
      )
      await waitFor(() => queryByText('Yes'))
      fireEvent.click(getByText('Yes'))

      expect(agree).toHaveBeenCalled()
      await waitFor(() => true)
      expect(initSentry).toHaveBeenCalled()
    })
  })
  describe('when disagree', () => {
    it('calls disagree', async () => {
      const { getByText, queryByText } = render(
        <TestProvider>
          <CookieConsentWithEmotion />
        </TestProvider>
      )
      await waitFor(() => queryByText('No'))
      fireEvent.click(getByText('No'))
      expect(disagree).toHaveBeenCalled()
    })
  })
})
