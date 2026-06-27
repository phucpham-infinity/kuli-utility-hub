import type { PageSnapshot } from '../types'

export async function getActiveTabSnapshot(): Promise<PageSnapshot> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (!tab?.id) throw new Error('No active tab found.')

  return chrome.tabs.sendMessage<PageSnapshot>(tab.id, { type: 'KULI_SCAN_PAGE' })
}
