import { initialRoster } from './appData.js'

// Recover natural positions in old browser saves that used FLEX as a position.
const suppliedPositions = new Map(initialRoster.map((player) => [player.id, player.position === 'FLEX' ? 'WR' : player.position]))

// A lineup slot is not the player's natural position. Keep both when swapping.
export const slotOf = (player) => player.lineupPosition ?? player.position
export const positionOf = (player) => player.naturalPosition ?? suppliedPositions.get(player.id) ?? player.position
export const canReplace = (starter, reserve) => starter.rosterSlot === 'starter' && reserve.rosterSlot === 'bench' && (slotOf(starter) === positionOf(reserve) || (slotOf(starter) === 'FLEX' && ['RB', 'WR', 'TE'].includes(positionOf(reserve))))

export function swapRoster(roster, playerId, replacementId) {
  const player = roster.find((item) => item.id === playerId)
  const replacement = roster.find((item) => item.id === replacementId)
  if (!player || !replacement) return roster
  const starter = player.rosterSlot === 'starter' ? player : replacement
  const reserve = player.rosterSlot === 'bench' ? player : replacement
  if (!canReplace(starter, reserve)) return roster
  return roster.map((item) => item.id === starter.id
    ? { ...item, rosterSlot: 'bench', position: positionOf(item), naturalPosition: positionOf(item), lineupPosition: null }
    : item.id === reserve.id
      ? { ...item, rosterSlot: 'starter', position: positionOf(item), naturalPosition: positionOf(item), lineupPosition: slotOf(starter) }
      : item)
}

// Explicit sample deltas; never rank players across positions by raw projection.
export const demoTrends = {
  'trevor-lawrence': 0.4, 'ashton-jeanty': 2.1, 'bhayshul-tuten': -3.1,
  'jaxon-smith-njigba': 4.2, 'malik-nabers': 1.7, 'harold-fannin': 0.2,
  'marvin-harrison-jr': 2.4, 'seahawks-dst': 0.6, 'will-reichard': 1.1,
  'kenneth-gainwell': 1.3, 'jakobi-meyers': 0.5, 'malachi-washington': -1.8,
  'marshawn-lloyd': -1.4, 'jonah-coleman': 1.6,
}
