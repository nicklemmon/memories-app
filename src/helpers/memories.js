import { dateToString } from 'src/helpers/date'

export function formatMemories(memories) {
  if (!memories || memories.length === 0) return []

  return memories
    .sort(function(a, b) {
      return new Date(b.recordedDate.iso) - new Date(a.recordedDate.iso)
    })
    .map(memory => {
      const formattedDate = memory.recordedDate ? dateToString(memory.recordedDate) : null

      return {
        ...memory,
        date: formattedDate,
      }
    })
}
