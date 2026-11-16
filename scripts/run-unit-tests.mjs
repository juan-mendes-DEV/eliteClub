import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

const temporaryDirectory = mkdtempSync(join(tmpdir(), 'elite-diagnostic-tests-'));
const compiledModulePath = join(temporaryDirectory, 'diagnostic.mjs');
const compiledJournalPath = join(temporaryDirectory, 'journal.mjs');

try {
  const source = readFileSync(new URL('../src/lib/diagnostic.ts', import.meta.url), 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  writeFileSync(compiledModulePath, output);

  const journalSource = readFileSync(new URL('../src/lib/journal.ts', import.meta.url), 'utf8');
  const journalOutput = ts.transpileModule(journalSource, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  writeFileSync(compiledJournalPath, journalOutput);

  const testFiles = ['tests/diagnostic.test.mjs', 'tests/diagnostic-flow.test.mjs', 'tests/journal.test.mjs'];
  const result = spawnSync(process.execPath, ['--test', ...testFiles], {
    cwd: process.cwd(),
    env: { ...process.env, ELITE_DIAGNOSTIC_MODULE_PATH: compiledModulePath, ELITE_JOURNAL_MODULE_PATH: compiledJournalPath },
    stdio: 'inherit',
  });

  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  rmSync(compiledModulePath, { force: true });
  rmSync(compiledJournalPath, { force: true });
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
