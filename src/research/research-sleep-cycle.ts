// MemForge — Research-variant SleepCycleEngine
//
// Subclass scaffold for the SDM (Sparse Distributed Memory) research variant.
// Mirrors the relationship between ResearchMemoryManager and MemoryManager.
//
// Current state: passthrough — every override delegates to `super`.
//
// Likely first SDM experiment for sleep phases (notes, not yet implemented):
//   - phaseScoring: replace the 5-factor composite (recency, frequency,
//     centrality, reflection, stability) with an SDM-flavored "activation
//     density" signal — score by how often a memory's hard-locations were
//     hit during recent retrievals.
//   - reviseMemory: instead of LLM-rewriting the row's content, reinforce or
//     decay the activation pattern at the row's hard-locations. (This is a
//     bigger redesign and likely needs a sidecar address-space table first.)
//   - phaseTriage: evict on activation density rather than composite
//     importance.
//
// See /root/.claude/plans/continue-the-research-on-merry-rabbit.md.

import { SleepCycleEngine } from '../sleep-cycle.js';
import { getLogger } from '../logger.js';

const log = getLogger('research-sleep-cycle');

export class ResearchSleepCycleEngine extends SleepCycleEngine {
  protected override async phaseScoring(agentId: string): Promise<number> {
    log.debug({ agentId, phase: 1, variant: 'sdm-passthrough' }, 'research phaseScoring');
    return super.phaseScoring(agentId);
  }

  protected override async phaseTriage(
    agentId: string,
  ): Promise<{ evicted: number; flaggedIds: bigint[] }> {
    log.debug({ agentId, phase: 2, variant: 'sdm-passthrough' }, 'research phaseTriage');
    return super.phaseTriage(agentId);
  }

  protected override async reviseMemory(agentId: string, warmTierId: bigint): Promise<number> {
    log.debug(
      { agentId, phase: 3, warmTierId: String(warmTierId), variant: 'sdm-passthrough' },
      'research reviseMemory',
    );
    return super.reviseMemory(agentId, warmTierId);
  }
}
