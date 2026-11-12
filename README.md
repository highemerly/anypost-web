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
各社の登録商標または商標であり、共有先を示す目的でだけ使っている。Creative Commons でライセンスされているものは次のとおり。

| ロゴ | ライセンス |
|---|---|
| Misskey（`misskey.png`） | [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) |
| GNU social（`gnusocial.png`） | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Lemmy（`lemmy.png`。作者：Andy Cuccaro） | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Iceshrimp（`iceshrimp.png`。© 2023 Laura Hausmann、作者：Kilcat。公式の黒の版に余白を加えて PNG に変換） | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

各プロジェクトのリポジトリに含まれ、そのライセンスで使っているものは次のとおり。

| ロゴ | ライセンス |
|---|---|
| Hubzilla（`hubzilla.png`。© Hubzilla Community。[framagit.org/hubzilla/core](https://framagit.org/hubzilla/core)） | MIT |
| PieFed（`piefed.png`。[codeberg.org/rimu/pyfedi](https://codeberg.org/rimu/pyfedi)） | AGPL-3.0 |
| snac（`snac.png`。Susie。© grunfink et al.。[codeberg.org/grunfink/snac2](https://codeberg.org/grunfink/snac2)） | MIT |

タイッツーのアイコン（`taittsuu.png`）は、タイッツーが共有ボタン用に配布しているもの（[taittsuu.com/share_link](https://taittsuu.com/share_link)）。

帰属表示はサイトの「ライセンス」（`/license`）にもある。
