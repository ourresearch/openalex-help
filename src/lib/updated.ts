import { execFileSync } from 'node:child_process';
import type { AnyEntry, Tab } from './tabs';

// "Last updated" dates come from git, not from a hand-maintained frontmatter
// field (oxjob #637): a date a writer has to remember to bump is a date that
// silently lies. One `git log` pass over content/ builds the whole map at
// build time — per-file `git log` calls would be ~500 subprocess spawns.
//
// What's stored is the INSTANT the edit was made (%aI — ISO 8601 with the
// author's UTC offset, i.e. the same fact as %at/epoch seconds, written in the
// form `<time datetime>` accepts and `new Date()` parses). The instant is the
// primitive fact; a calendar date is one projection of it, so we keep the
// instant here and let each reader's browser project it (LastUpdated.astro).
//
// AUTHOR date, not committer date: a rebase rewrites committer dates and would
// restamp the whole tree as freshly-edited. The tradeoff is that a
// cherry-picked commit reads as edited when it was written, not when it
// landed — the better failure of the two. Walking newest-first, the first
// commit that touches a path wins.
function buildMap(): Map<string, string> {
  const map = new Map<string, string>();
  let out: string;
  try {
    // A shallow checkout (actions/checkout's default fetch-depth: 1) has ONE
    // commit, so git would date every article to deploy day — a confident
    // wrong answer, which is worse than none. Bail loudly instead.
    const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
      encoding: 'utf8',
    }).trim();
    if (shallow === 'true') {
      console.warn(
        '[updated] shallow git checkout — omitting "Last updated" dates. Set fetch-depth: 0.'
      );
      return map;
    }
    out = execFileSync(
      'git',
      ['log', '--format=%x00%aI', '--name-only', '--no-renames', '--', 'content'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
    );
  } catch {
    // No git history available (shallow clone, tarball export). Show no date
    // rather than a wrong one — see the fetch-depth: 0 note in deploy.yml.
    return map;
  }
  let date = '';
  for (const line of out.split('\n')) {
    if (line.startsWith('\0')) {
      date = line.slice(1);
    } else if (line && !map.has(line)) {
      map.set(line, date);
    }
  }
  return map;
}

let cached: Map<string, string> | undefined;
function gitDates(): Map<string, string> {
  return (cached ??= buildMap());
}

/**
 * When an article was last edited, or undefined when git history isn't
 * available. Two shapes, both valid `<time datetime>` values:
 *
 *  - from git: a full instant, `2026-08-11T19:09:05-05:00`
 *  - from frontmatter `updated:`: a bare `2026-08-11`, which asserts a
 *    calendar date and nothing about time of day
 *
 * Frontmatter wins over git — the escape hatch for mechanical sweeps (a
 * sitewide sed or a git-mv rename bumps every file's git date without changing
 * what any article says).
 */
export function lastUpdatedFor(tab: Tab, entry: AnyEntry): string | undefined {
  const override = entry.data.updated;
  if (override) return override;
  const path = entry.filePath ?? `content/${tab}/${entry.id}.md`;
  return gitDates().get(path);
}
