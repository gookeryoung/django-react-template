import { mswServer } from '@/utils/request/mswServer'
import matchers, { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest'

declare global {
  namespace Vi {
    // @ts-ignore
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}

expect.extend(matchers)

// 在所有测试之前启动服务器
beforeAll(() => {
  mswServer.listen({ onUnhandledRequest: 'error' })

  // @ts-ignore
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

// 每次测试后重置处理程序 `对测试隔离很重要`
afterEach(() => {
  mswServer.resetHandlers()
  cleanup()
})

// 所有测试后关闭服务器
afterAll(() => mswServer.close())
