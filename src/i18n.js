'use strict';

const EN = {
  'settings.language.name': 'Language',
  'settings.language.desc': 'Use Obsidian language automatically, or choose a Cadence language.',
  'settings.timezone.name': 'Timezone',
  'settings.timezone.desc': 'Use system timezone by default. Enter a standard IANA timezone such as Asia/Shanghai.',
  'settings.sp.name': 'Super Productivity (read-only)',
  'settings.sp.desc': 'Prepare a read-only data provider. Cadence never writes back to Super Productivity.',
};

const ZH_CN = {
  'settings.language.name': '语言',
  'settings.language.desc': '自动跟随 Obsidian 语言，或单独选择 Cadence 语言。',
  'settings.timezone.name': '时区',
  'settings.timezone.desc': '默认使用系统时区；可填写标准 IANA 时区，例如 Asia/Shanghai。',
  'settings.sp.name': 'Super Productivity（只读）',
  'settings.sp.desc': '准备只读数据提供方；Cadence 不会回写 Super Productivity。',
};

function normalizeLocale(locale) {
  return String(locale || 'en').replace('_', '-').toLowerCase();
}

function resolveLocale(preference, obsidianLocale) {
  const requested = preference === 'auto' || !preference ? obsidianLocale : preference;
  return normalizeLocale(requested) === 'zh-cn' ? 'zh-CN' : 'en';
}

function createI18n(preference, obsidianLocale) {
  const locale = resolveLocale(preference, obsidianLocale);
  const dictionary = locale === 'zh-CN' ? ZH_CN : EN;
  return {
    locale,
    t(key, variables) {
      let text = dictionary[key] || EN[key] || key;
      Object.entries(variables || {}).forEach(([name, value]) => {
        text = text.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value));
      });
      return text;
    },
  };
}

module.exports = { createI18n, resolveLocale };
