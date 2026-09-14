'use strict';

/**
 * Read-only boundary for Super Productivity Local REST API.
 * The endpoint contract is intentionally isolated here: callers consume only
 * normalized dashboard data, and this provider never performs mutations.
 */
class SuperProductivityProvider {
  constructor({ requestUrl, baseUrl }) {
    this.requestUrl = requestUrl;
    this.baseUrl = String(baseUrl || '').replace(/\/$/, '');
  }

  isConfigured() { return Boolean(this.baseUrl && this.requestUrl); }

  async getSnapshot() {
    if (!this.isConfigured()) return { projects: [], todayTasks: [], summary: null, unavailable: true };
    // Endpoint mapping remains the only integration-specific surface. It will
    // be finalized against the user's enabled Local REST API version.
    const fetchJson = async (path) => this.requestUrl({ url: `${this.baseUrl}${path}`, method: 'GET' });
    const [projects, todayTasks, summary] = await Promise.all([
      fetchJson('/projects'), fetchJson('/tasks/today'), fetchJson('/summary/today'),
    ]);
    return { projects: projects || [], todayTasks: todayTasks || [], summary: summary || null, unavailable: false };
  }
}

module.exports = { SuperProductivityProvider };
