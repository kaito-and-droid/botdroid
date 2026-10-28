// Copies the template catalog from the app (parent repo) into src/data/templates.json so the
// /templates page always matches what the app ships. Run from landing/ inside the bot_droid repo.
import { readFileSync, writeFileSync } from 'node:fs';

const src = new URL('../../app/src/main/assets/bot_templates.json', import.meta.url);
const raw = JSON.parse(readFileSync(src, 'utf8'));
const list = Array.isArray(raw) ? raw : raw.templates;
const slim = list.map((t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  category: t.category,
  botType: t.botType,
  mcp: (t.mcpServers ?? []).map((s) => s.name ?? s.id).filter(Boolean),
  channels: channelsOf(t),
  // AI agents always need a provider key (or an on-device model); llmConfig marks Python
  // templates that call an LLM (Web Summarizer).
  needsKey: t.botType === 'PICOCLAW' || Boolean(t.llmConfig),
  // Same rule as BotTemplate.isBeta in the app: flagged templates plus every MCP-backed one.
  beta: Boolean(t.beta) || (t.mcpServers ?? []).length > 0,
}));

// Python templates list their channels; the rest of the Python and on-device bots run on Telegram.
// AI templates name their default channel in the category ("AI Bots — Discord"); several also say
// they work on Zalo.
function channelsOf(t) {
  const names = { telegram: 'Telegram', zalo: 'Zalo', whatsapp: 'WhatsApp' };
  if (t.channels?.length) return t.channels.map((c) => names[c] ?? c);
  if (t.botType !== 'PICOCLAW') return ['Telegram'];
  const main = t.category.split('—').pop().trim();
  const list = [main];
  if (main !== 'Zalo' && /Telegram or Zalo/.test(t.description)) list.push('Zalo');
  return list;
}
writeFileSync(new URL('../src/data/templates.json', import.meta.url), JSON.stringify(slim, null, 2) + '\n');
console.log(`synced ${slim.length} templates`);
