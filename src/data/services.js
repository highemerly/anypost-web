// 対応サービスの一覧。対応サービスのページと、共有画面のポップアップで使う
// holder: 商標の権利者。対応サービスのページの「商標」の一覧はここから作る。
// 企業などの権利者がはっきりしないオープンソースのプロジェクトは書かず、一覧の下の一文でまとめて扱う
export const fediverseServices = [
  { name: 'mastodon', displayName: 'Mastodon', icon: '/assets/brand/mastodon.png', holder: 'Mastodon gGmbH' },
  { name: 'misskey', displayName: 'Misskey', icon: '/assets/brand/misskey.png' },
  { name: 'pleroma', displayName: 'Pleroma', icon: '/assets/brand/pleroma.png' },
  { name: 'gnusocial', displayName: 'GNU social', icon: '/assets/brand/gnusocial.png' },
  { name: 'diaspora', displayName: 'diaspora*', icon: '/assets/brand/diaspora.png' },
  { name: 'friendica', displayName: 'Friendica', icon: '/assets/brand/friendica.png' },
  { name: 'lemmy', displayName: 'Lemmy', icon: '/assets/brand/lemmy.png' },
  { name: 'piefed', displayName: 'PieFed', icon: '/assets/brand/piefed.png' },
  { name: 'hubzilla', displayName: 'Hubzilla', icon: '/assets/brand/hubzilla.png' },
  { name: 'iceshrimp.net', displayName: 'Iceshrimp.NET', icon: '/assets/brand/iceshrimp.png' },
  { name: 'snac', displayName: 'snac', icon: '/assets/brand/snac.png' },
  { name: 'bluesky', displayName: 'Bluesky', icon: '/assets/brand/bluesky.png', holder: 'Bluesky Social, PBC' }
]

export const traditionalServices = [
  { name: 'twitter', displayName: 'X (Twitter)', icon: '/assets/brand/twitter.png', holder: 'X Corp.' },
  { name: 'threads', displayName: 'Threads', icon: '/assets/brand/threads.png', holder: 'Meta Platforms, Inc.' },
  { name: 'facebook', displayName: 'Facebook', icon: '/assets/brand/facebook.png', holder: 'Meta Platforms, Inc.' },
  { name: 'reddit', displayName: 'Reddit', icon: '/assets/brand/reddit.png', holder: 'Reddit, Inc.' },
  { name: 'tumblr', displayName: 'Tumblr', icon: '/assets/brand/tumblr.png', holder: 'Tumblr, Inc.' },
  { name: 'linkedin', displayName: 'LinkedIn', icon: '/assets/brand/linkedin.png', holder: 'LinkedIn Corporation' },
  { name: 'line', displayName: 'LINE', icon: '/assets/brand/line.png', holder: 'LY Corporation' },
  { name: 'whatsapp', displayName: 'WhatsApp', icon: '/assets/brand/whatsapp.png', holder: 'WhatsApp LLC' },
  { name: 'telegram', displayName: 'Telegram', icon: '/assets/brand/telegram.png', holder: 'Telegram FZ-LLC' },
  { name: 'hatenabookmark', displayName: 'Hatena Bookmark', icon: '/assets/brand/hatenabookmark.png', holder: 'Hatena Co., Ltd.' },
  { name: 'taittsuu', displayName: 'タイッツー', icon: '/assets/brand/taittsuu.png', holder: 'ホクシス' },
  { name: 'pinterest', displayName: 'Pinterest', icon: '/assets/brand/pinterest.png', holder: 'Pinterest, Inc.' },
  { name: 'xing', displayName: 'XING', icon: '/assets/brand/other.png', holder: 'New Work SE' }
]
