// MemForge — Research-variant MemoryManager
//
// Subclass scaffold for the SDM (Sparse Distributed Memory, Kanerva 1988)
// research variant. Lives in src/research/ to keep core upstream files
// (src/memory-manager.ts) untouched aside from the minimal `protected`
// visibility promotions on `queryHybrid` and `rerankWithLlm`.
//
// Current state: passthrough — every override delegates to `super`. This
// scaffold proves the extension points compile and gives a clean home for
// SDM-specific retrieval logic to land.
//
// Likely first SDM experiment (notes, not yet implemented):
//   1. Compute a high-dim binary/bipolar address from each warm-tier row's
//      content (hash or quantized embedding) at consolidation time, store in
//      a sidecar table or as a metadata column.
//   2. In queryHybrid, replace RRF with a Hamming-radius readout:
//      activate all rows whose address is within H of the query address,
//      threshold-vote the activated rows, return top-k.
//   3. Compare R@5 / R@10 against the upstream RRF baseline on LongMemEval.
//
// See /root/.claude/plans/continue-the-research-on-merry-rabbit.md.

import type { Pool } from 'pg';
import { MemoryManager } from '../memory-manager.js';
import { SleepCycleEngine } from '../sleep-cycle.js';
import { getLogger } from '../logger.js';
import type { LLMProvider } from '../llm.js';
import type { EmbeddingProvider } from '../embedding.js';
import type { AuditChain } from '../audit.js';
import type { QueryResult, SleepCycleConfig } from '../types.js';
import { ResearchSleepCycleEngine } from './research-sleep-cycle.js';

const log = getLogger('research-memory-manager');

export class ResearchMemoryManager extends MemoryManager {
  protected override async queryHybrid(
    agentId: string,
    searchText: string,
    limit: number,
    after?: Date,
    before?: Date,
  ): Promise<QueryResult[]> {
    log.debug({ agentId, mode: 'hybrid', variant: 'sdm-passthrough' }, 'research queryHybrid');
    return super.queryHybrid(agentId, searchText, limit, after, before);
  }

  protected override async rerankWithLlm(
    question: string,
    results: QueryResult[],
  ): Promise<QueryResult[]> {
    log.debug({ count: results.length, variant: 'sdm-passthrough' }, 'research rerank');
    return super.rerankWithLlm(question, results);
  }

  protected override createSleepEngine(
    pool: Pool,
    llm: LLMProvider,
    embedder: EmbeddingProvider,
    cycleConfig: SleepCycleConfig,
    audit: AuditChain | null,
  ): SleepCycleEngine {
    return new ResearchSleepCycleEngine(pool, llm, embedder, cycleConfig, audit);
  }
}
