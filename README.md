# anypost-web

Mastodon・Misskey などの Fediverse や各種 SNS へ、ひとつのリンクから共有するためのサービス AnyPost のフロントエンド（Vue 3）。

https://anypost.dev

共有先のサーバーの種類（Mastodon・Misskey など）は、別のリポジトリの API（instance-info-api）が判定する。

開発の手順は [docs/development.md](docs/development.md)。

## 共有リンク

`https://anypost.dev/share` にクエリパラメータを付けると、共有フォームに値が入った状態で開く（すべて省略可）。

| パラメータ | 内容 |
|---|---|
| `i` | 共有先のサーバー（例：`mastodon.social`） |
| `t` | 本文 |
| `s` | 共有する URL |
| `v` | 公開範囲（例：Mastodon なら `public`・`unlisted`） |
| `h` | ハッシュタグ |
| `a` | `1` で、サーバーを確かめたあと共有先の画面へ自動で移る（`i` が要る） |

```
https://anypost.dev/share?i=mastodon.social&t=Hello%20World&s=https://example.com&v=unlisted&a=1
```

詳しくはサイトの「使い方」（`/howto`）。

## ライセンス

コードは [AGPL-3.0-only](LICENSE)。

`public/assets/brand/` の各サービスのロゴはこのライセンスの対象外で、権利はそれぞれの権利者に帰属する。
各社の登録商標または商標であり、共有先を示す目的でだけ使っている。公開ライセンスのものは次のとおり（2026-11-12 に一次情報で確認）。

| ロゴ | 著作権者・作者 | ライセンス | 出典・加工 |
|---|---|---|---|
| Misskey（`misskey.png`） | Misskey Project | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Misskey Hub](https://misskey-hub.net/brand-assets/) の `icon.png` そのまま |
| Lemmy（`lemmy.png`） | Andy Cuccaro | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [LemmyNet/lemmy](https://github.com/LemmyNet/lemmy) |
| Iceshrimp.NET（`iceshrimp.png`） | © 2023 Laura Hausmann、作者 Kilcat | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [iceshrimp/branding](https://iceshrimp.dev/iceshrimp/branding) の黒のマークに余白を加えて PNG に変換（改変物も CC BY-SA 4.0） |
| GNU social（`gnusocial.png`） | Jonas Laugs・Steven DuBois | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [gnu.org](https://www.gnu.org/graphics/social) のロゴのマーク部分 |
| Hubzilla（`hubzilla.png`） | © 2019 Hubzilla Community | MIT | [hubzilla/core](https://framagit.org/hubzilla/core) のロゴを縮小 |
| PieFed（`piefed.png`） | © 2024 Rimu Atkinson | [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) | [rimu/pyfedi](https://codeberg.org/rimu/pyfedi) の SVG を PNG に書き出し（元の SVG は `app/static/images`） |
| snac（`snac.png`。Susie） | © 2022–2026 grunfink et al. | MIT | [grunfink/snac2](https://codeberg.org/grunfink/snac2) の画像を縮小 |

MIT のものは、サイトに著作権表示と許諾の全文を載せている（MIT は「全ての複製に含める」ことを求めるため）。

タイッツーのアイコン（`taittsuu.png`）は、タイッツー（運営：ホクシス）が共有ボタン用に配布しているもの（[taittsuu.com/share_link](https://taittsuu.com/share_link)。加工も可とされている）。

帰属表示はサイトの「対応サービス」の下部（`/services#license`）にもある。ロゴを足したり差し替えたりしたら、両方を直す。
