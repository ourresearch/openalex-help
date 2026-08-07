// Build-time entity counts (oxjob #354 Pass Z). Each Data-tab entity page shows
// the exact live count from the API, fetched once per entity type per build.
// A failed fetch returns null and the count row is simply omitted — an API
// hiccup must never fail the build.
const cache = new Map<string, Promise<number | null>>();

export function entityCount(apiPath: string): Promise<number | null> {
  if (!cache.has(apiPath)) {
    cache.set(
      apiPath,
      fetch(`https://api.openalex.org/${apiPath}?per_page=1&mailto=help-site-build@openalex.org`, {
        signal: AbortSignal.timeout(10_000),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => (typeof j?.meta?.count === 'number' ? j.meta.count : null))
        .catch(() => null)
    );
  }
  return cache.get(apiPath)!;
}
