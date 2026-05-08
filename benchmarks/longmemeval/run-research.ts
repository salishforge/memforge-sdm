// LongMemEval — Research-variant benchmark wrapper
//
// Thin wrapper around benchmarks/longmemeval/run.ts that retargets results
// to a separate output directory and (by default) the research server's
// port, so SDM-variant runs don't overwrite the upstream baseline numbers
// stored in benchmarks/results/.
//
// Defaults applied if the corresponding env var is unset:
//   MEMFORGE_URL         → http://localhost:3334  (research server port)
//   BENCHMARK_RESULTS_DIR → benchmarks/results-research
//
// Run (after starting the research server):
//   tsx src/research/research-server.ts &
//   tsx benchmarks/longmemeval/run-research.ts
//
// See /root/.claude/plans/continue-the-research-on-merry-rabbit.md.

if (!process.env['MEMFORGE_URL']) {
  process.env['MEMFORGE_URL'] = 'http://localhost:3334';
}
if (!process.env['BENCHMARK_RESULTS_DIR']) {
  process.env['BENCHMARK_RESULTS_DIR'] = 'benchmarks/results-research';
}

console.log('╔══════════════════════════════════════════╗');
console.log('║  MemForge LongMemEval — RESEARCH VARIANT ║');
console.log('╚══════════════════════════════════════════╝');
console.log(`Target server: ${process.env['MEMFORGE_URL']}`);
console.log(`Results dir:   ${process.env['BENCHMARK_RESULTS_DIR']}`);
console.log('');

await import('./run.js');
