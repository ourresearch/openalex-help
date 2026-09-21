/**
 * Callouts in markdown, GitHub-admonition style:
 *
 *   > [!claude]
 *   > You can ask Claude: "…". Set up once via the [AI agent connector](/access/connector/).
 *
 * Renders as <aside class="callout callout-claude"> with a bot icon and the label
 * "In Claude". The one kind that exists today is `claude`, used sparingly: only on pages
 * where the AI agent connector is clearly the faster route (Jason, 2026-09-21, oxjob #1279;
 * it is an option, not the default path). Add kinds to KINDS as needed. No dependencies: it edits the mdast blockquote
 * in place (hName/hProperties) and drops the marker text.
 */

const KINDS = {
  claude: {
    label: 'In Claude',
    // Lucide "bot" (stroked, 24×24), matching the site's Feather-style icons.
    icon:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
  },
};

const MARKER = /^\[!([a-z]+)\]\s*/i;

function visit(node, fn) {
  if (!node || typeof node !== 'object') return;
  fn(node);
  for (const child of node.children ?? []) visit(child, fn);
}

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'blockquote') return;
      const para = node.children?.[0];
      const text = para?.type === 'paragraph' ? para.children?.[0] : null;
      if (!text || text.type !== 'text') return;
      const m = text.value.match(MARKER);
      if (!m) return;
      const kind = KINDS[m[1].toLowerCase()];
      if (!kind) return;
      // Strip the marker (and a line break after it) from the first text node.
      text.value = text.value.slice(m[0].length).replace(/^\n/, '');
      if (!text.value) para.children.shift();
      if (!para.children.length) node.children.shift();
      node.data = {
        ...(node.data ?? {}),
        hName: 'aside',
        hProperties: { className: ['callout', `callout-${m[1].toLowerCase()}`] },
      };
      node.children.unshift({
        type: 'html',
        value: `<div class="callout-head">${kind.icon}<span>${kind.label}</span></div>`,
      });
    });
  };
}
