<!--
  プライバシーポリシー（日本語が原文、下に英語版）。

  節の並びと言葉づかいは、同じ管理者の別サービスの SHAMEZO（movapic-neo の
  src/components/legal/PrivacyContent.tsx）と Hosteka に揃えてある。読む人が同じ順に同じものを探せるように。
  片方を直すときはもう片方も見ること。日本語版を直したら英語版も直すこと。

  Tailwind の typography プラグインは入っていない（prose は効かない）ので、見出し・リスト・表の
  見た目はクラスで当てる。

  ブラウザ内の保存領域（localStorage）のキーと Cookie は名前を全部載せる。足したら手で載せること。
-->
<template>
  <div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <article class="max-w-none text-gray-700 leading-relaxed [overflow-wrap:anywhere]">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        {{ $t('privacy.title') }}
      </h1>

      <p class="text-sm text-gray-500 mb-4">
        最終更新日: 2026年11月12日
      </p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p class="text-blue-800 font-medium">
          <span class="font-semibold">English follows below</span> / このプライバシーポリシーの英語版は下部に記載しています。<br>
          ただし、原文は日本語版であり、英語版と齟齬がある場合は日本語版が優先されます。また、本ポリシーは日本の法律に基づいて解釈されます。
        </p>
      </div>

      <p>
        AnyPost（anypost.dev、以下「本サービス」）は、個人情報保護法をはじめとする関連法令を遵守し、本サービスを利用する全ての方（以下「ユーザー」）の個人情報を適切に取り扱います。そのために、以下のとおりプライバシーポリシーを定めます。本サービスの運営者を以下「管理者」といいます。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        個人情報とは
      </h2>
      <p>
        本ポリシーにおける「個人情報」とは、個人情報保護法第2条第1項に定める個人情報を指しています。例えば、氏名・メールアドレス・IPアドレスなど、特定の個人を識別できる情報を指します。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        収集する個人情報とその収集方法
      </h2>

      <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
        ユーザーに情報入力をお願いすることで収集する情報
      </h3>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>投稿先サーバー名</li>
      </ul>
      <p class="text-sm text-gray-600">
        投稿先サーバーの種類（Mastodon・Misskey など）を判定するために、本サービスのサーバーへ送信します。本サービスは、判定のために投稿先サーバーへ問い合わせ、その結果（サーバーの種類・バージョン・ユーザー数など、サーバーそのものの情報）を一定期間保存します。この情報を保存する際は、問い合わせたユーザーを識別しうる情報（以下「HTTPアクセスによって収集する情報」を含みます）とは紐付けられない状態で保存されます。
      </p>

      <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
        HTTPアクセスによって収集する情報
      </h3>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>IPアドレス</li>
        <li>IPアドレスから推定される接続元の国・地域・都市</li>
        <li>リクエスト日時</li>
        <li>リクエスト先URL</li>
        <li>TLSバージョン・暗号スイート・フィンガープリント</li>
        <li>ブラウザに関する情報（User-Agent, Referer, Accept-Languageヘッダ）</li>
        <li>その他サーバーへのアクセスログ</li>
      </ul>
      <p class="text-sm text-gray-600">
        共有画面を、投稿するテキスト・URL・ハッシュタグなどを含むURL（例: 他のサイトの共有ボタンから開くURL）で開いた場合、それらはリクエスト先URLの一部としてアクセスログに記録されます。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        収集しない情報
      </h2>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>投稿先のサービスのアカウント情報、認証情報、投稿履歴</li>
        <li>投稿内容</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        情報の利用目的
      </h2>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>投稿先サーバーの判定による、本サービスの提供</li>
        <li>ユーザーからの問い合わせへの回答および本人確認</li>
        <li>不正利用・攻撃への対処（アクセス制限を含む）</li>
        <li>技術的不具合の原因解析、パフォーマンス・サービスの安定性・セキュリティの改善</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        Cookieとブラウザ内の保存領域の使用
      </h2>
      <p class="mb-3">
        本サービスは、以下の情報をブラウザ内の保存領域（localStorage）に保存します。これらは保存されているだけでは本サービスのサーバーへ送信されません。
      </p>
      <div class="overflow-x-auto mb-4">
        <table class="min-w-full text-sm border border-gray-200">
          <caption class="sr-only">
            本サービスがブラウザ内の保存領域に保存する情報の一覧
          </caption>
          <thead class="bg-gray-50">
            <tr>
              <th class="border border-gray-200 px-3 py-2 text-left">
                名前
              </th>
              <th class="border border-gray-200 px-3 py-2 text-left">
                目的
              </th>
              <th class="border border-gray-200 px-3 py-2 text-left">
                保存する条件
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-200 px-3 py-2">
                locale
              </td>
              <td class="border border-gray-200 px-3 py-2">
                表示言語の設定を記憶するため
              </td>
              <td class="border border-gray-200 px-3 py-2">
                言語を切り替えたとき
              </td>
            </tr>
            <tr>
              <td class="border border-gray-200 px-3 py-2">
                lastUsedServer
              </td>
              <td class="border border-gray-200 px-3 py-2">
                前回使用した投稿先サーバー名を記憶し、入力を省略できるようにするため
              </td>
              <td class="border border-gray-200 px-3 py-2">
                投稿の操作をしたとき
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mb-3">
        記憶した投稿先サーバー名は、共有画面の「過去使ったサーバーの記録を削除する」からいつでも削除できます。
      </p>
      <p>
        本サービスはCookieを使用しません。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        外部サービスへの情報提供
      </h2>

      <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
        投稿先のサービス（Mastodon・Misskey などのサーバー、X・Bluesky などのサービス）
      </h3>
      <p>
        ユーザーが投稿の操作をした際、ユーザーのブラウザは、入力したテキスト・URL・ハッシュタグ・公開範囲を含む、投稿先のサービスの共有画面を開きます。投稿先のサービスでの取り扱いは、各サービスのプライバシーポリシーをご参照ください。また、投稿先サーバーの種類を判定する際、本サービスのサーバーから投稿先サーバーへ問い合わせますが、この問い合わせにユーザーの情報は含めません。
      </p>

      <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
        Cloudflare, Inc.
      </h3>
      <p>
        Cloudflare, Inc.のCDN・セキュリティサービスを利用しています。Cloudflareはサービス提供にあたり、アクセスログ（IPアドレス、User-Agent、アクセス日時等）を処理します。Cloudflareのプライバシーポリシーもご参照ください。
        <a
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline"
        >https://www.cloudflare.com/privacypolicy/</a>
      </p>

      <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
        Google LLC
      </h3>
      <p class="mb-3">
        ページの表示に用いるフォントを Google Fonts から読み込んでいます。そのため、ページを表示した際、IPアドレスやUser-Agentなどが Google に送信されます。
      </p>
      <p>
        Google のプライバシーポリシーもご参照ください。
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline"
        >https://policies.google.com/privacy</a>
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        分析ツール
      </h2>
      <p class="mb-3">
        技術的な分析のため、ページを表示したとき、以下の情報を含むビーコンを本サービスのサーバーへ送信することがあります。
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>リクエスト先URL（クエリストリングを除く）、ページの開き方（通常・再読み込み・戻る/進む）、計測日時</li>
        <li>表示や操作への応答に要した時間、レイアウトのずれ、受信したデータ量、CDNのキャッシュヒット有無と応答した拠点</li>
        <li>端末の種別、OS・ブラウザの種類（バージョンを除く）</li>
        <li>回線の種別、通信プロトコル、AS番号、IPアドレスから推定される接続元の国・地域</li>
      </ul>
      <p class="mb-3">
        ビーコンには、Cookie、ユーザーやブラウザを識別するID、IPアドレス、User-Agentを含めず、第三者がアクセスできない領域に保管します。技術的不具合の解消と、パフォーマンス・安定性・セキュリティの向上のためだけに利用し、広告やユーザーのトラッキングには利用しません。Google Analytics などの外部の分析ツールにも送信しません。
      </p>
      <p>
        Global Privacy Control（GPC）を有効にしたブラウザからは送信しません（対応するブラウザまたは拡張機能が必要です）。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        第三者への提供
      </h2>
      <p class="mb-3">
        ユーザーの同意なく第三者に個人情報を提供することはありません。ただし以下の場合を除きます。
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>人の生命・身体・財産の保護のために必要で、本人の同意を得ることが困難なとき</li>
        <li>公衆衛生・児童の健全育成のために必要で、本人の同意を得ることが困難なとき</li>
        <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行するため協力が必要な場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
        <li>個人情報保護法その他の法令で認められるとき</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        プライバシー保護、セキュリティ対策
      </h2>
      <p class="mb-3">
        本サービスの管理者は、取り扱う個人情報の漏えい・滅失・毀損を防止し、安全に管理するため、必要かつ適切な安全管理措置を講じるものとします。以下はその一例です。
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>全ての通信はHTTPSで暗号化します</li>
        <li>投稿内容は、ユーザーのブラウザから投稿先のサービスへ直接送られるようにし、本サービスのサーバーを経由させません</li>
        <li>前回使用した投稿先サーバー名は、ユーザーのブラウザ内にのみ保存します</li>
        <li>IPアドレスやUser-Agentを含む「HTTPアクセスによって収集する情報」は、保存期間を90日とし、保存期間を経過した情報は速やかに完全に消去します</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        ユーザーの権利
      </h2>
      <p class="mb-3">
        ユーザーは以下の権利を有します。
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>個人情報の開示請求</li>
        <li>個人情報の訂正・削除</li>
        <li>利用停止</li>
      </ul>
      <p class="mb-3">
        本サービスの管理者は、ユーザーがこれら権利行使を求め、応じる必要があると判断した場合、遅延なく対応することとします。
      </p>
      <p class="mb-3">
        なお、個人情報の開示請求については以下のとおりとします。
      </p>
      <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
        <li>開示請求1件あたり最大で1,000円の事務手数料を申し受ける場合があります</li>
        <li>開示することで法令違反になる場合、サービス提供に著しい影響を与える場合、人の生命・身体・財産を害するおそれがある場合の少なくともいずれか一つに該当する場合、全部または一部を開示しないことがあります</li>
      </ul>
      <p>
        これらの権利行使については、下記のお問い合わせ先よりご連絡ください。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        プライバシーポリシーの変更
      </h2>
      <p>
        本ポリシーは予告なく変更されることがあります。重要な変更がある場合は、サービス上でお知らせします。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
        お問い合わせ
      </h2>
      <p>
        ユーザーの権利の行使、プライバシーに関する苦情やお問い合わせは、<a
          href="https://highemerly.net/contact.html"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 underline"
        >こちら</a>からご連絡ください。
      </p>

      <!-- English Version -->
      <div class="mt-16 pt-8 border-t border-gray-300">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy (English)
        </h1>

        <p class="text-sm text-gray-500 mb-8">
          Last Updated: November 12, 2026
        </p>

        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p class="text-yellow-800 font-medium">
            <span class="font-semibold">Notice:</span> This English version is provided for convenience only. The original Japanese version takes precedence in case of any discrepancies. This policy is governed by Japanese law.
          </p>
        </div>

        <p>
          AnyPost (anypost.dev, hereinafter "this Service") complies with the Act on the Protection of Personal Information of Japan and other relevant laws, and handles the personal information of everyone who uses this Service (hereinafter "Users") appropriately. To that end, we set out this privacy policy as follows. The operator of this Service is hereinafter referred to as the "Administrator".
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          What Is Personal Information
        </h2>
        <p>
          In this policy, "personal information" means personal information as defined in Article 2, Paragraph 1 of the Act on the Protection of Personal Information, such as names, email addresses, IP addresses and other information that can identify a specific individual.
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Personal Information We Collect and How
        </h2>

        <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
          Information you enter
        </h3>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>Destination server name</li>
        </ul>
        <p class="text-sm text-gray-600">
          It is sent to this Service's server to determine the type of the destination server (Mastodon, Misskey, etc.). To do so, this Service queries the destination server and stores the result (information about the server itself, such as its type, version and number of users) for a certain period. This information is stored in a state that is not linked to any information that could identify the User who asked (including the "Information collected through HTTP access" below).
        </p>

        <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
          Information collected through HTTP access
        </h3>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>IP address</li>
          <li>Country, region and city estimated from the IP address</li>
          <li>Request date and time</li>
          <li>Requested URL</li>
          <li>TLS version, cipher suite and fingerprint</li>
          <li>Browser information (User-Agent, Referer and Accept-Language headers)</li>
          <li>Other server access logs</li>
        </ul>
        <p class="text-sm text-gray-600">
          If the share screen is opened with a URL that contains the text, URL, hashtags, etc. to post (for example, a URL opened from a share button on another site), they are recorded in the access logs as part of the requested URL.
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Information We Do Not Collect
        </h2>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>Account information, credentials or posting history on the destination service</li>
          <li>Post content</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Purposes of Use
        </h2>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>Providing this Service by determining the destination server</li>
          <li>Responding to inquiries from Users and verifying their identity</li>
          <li>Dealing with abuse and attacks (including access restrictions)</li>
          <li>Analyzing the causes of technical problems, and improving performance, stability and security</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Use of Cookies and Browser Storage
        </h2>
        <p class="mb-3">
          This Service stores the following in your browser's storage (localStorage). Merely being stored, they are not sent to this Service's server.
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="min-w-full text-sm border border-gray-200">
            <caption class="sr-only">
              Data this Service stores in your browser's storage
            </caption>
            <thead class="bg-gray-50">
              <tr>
                <th class="border border-gray-200 px-3 py-2 text-left">
                  Name
                </th>
                <th class="border border-gray-200 px-3 py-2 text-left">
                  Purpose
                </th>
                <th class="border border-gray-200 px-3 py-2 text-left">
                  When stored
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-200 px-3 py-2">
                  locale
                </td>
                <td class="border border-gray-200 px-3 py-2">
                  To remember your display language
                </td>
                <td class="border border-gray-200 px-3 py-2">
                  When you switch the language
                </td>
              </tr>
              <tr>
                <td class="border border-gray-200 px-3 py-2">
                  lastUsedServer
                </td>
                <td class="border border-gray-200 px-3 py-2">
                  To remember the destination server you used last, so you can skip typing it
                </td>
                <td class="border border-gray-200 px-3 py-2">
                  When you post
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mb-3">
          You can delete the remembered destination server at any time with "Clear server history" on the share screen.
        </p>
        <p>
          This Service does not use cookies.
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Information Provided to External Services
        </h2>

        <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
          Destination services (servers such as Mastodon and Misskey, and services such as X and Bluesky)
        </h3>
        <p>
          When you post, your browser opens the destination service's share screen with the text, URL, hashtags and visibility you entered. Please refer to each service's privacy policy for how it handles them. When determining the type of the destination server, this Service's server queries the destination server, but the query contains no information about you.
        </p>

        <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
          Cloudflare, Inc.
        </h3>
        <p>
          We use the CDN and security services of Cloudflare, Inc. In providing them, Cloudflare processes access logs (IP address, User-Agent, access date and time, etc.). Please also refer to Cloudflare's privacy policy:
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800 underline"
          >https://www.cloudflare.com/privacypolicy/</a>
        </p>

        <h3 class="text-xl font-medium text-gray-900 mt-6 mb-3">
          Google LLC
        </h3>
        <p class="mb-3">
          We load the fonts used on the pages from Google Fonts, so your IP address, User-Agent, etc. are sent to Google when you view a page.
        </p>
        <p>
          Please also refer to Google's privacy policy:
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800 underline"
          >https://policies.google.com/privacy</a>
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Analytics
        </h2>
        <p class="mb-3">
          For technical analysis, when you view a page we may send a beacon to this Service's server containing the following:
        </p>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>Requested URL (excluding the query string), how the page was opened (normal, reload, back/forward), and the time of measurement</li>
          <li>Time taken to display and respond to interactions, layout shifts, amount of data received, whether the CDN cache was hit, and the location that responded</li>
          <li>Device type, and OS and browser type (without versions)</li>
          <li>Connection type, protocol, AS number, and country and region estimated from the IP address</li>
        </ul>
        <p class="mb-3">
          The beacon contains no cookies, no IDs that identify a user or browser, no IP address and no User-Agent, and it is stored where no third party can access it. It is used only to fix technical problems and to improve performance, stability and security, never for advertising or tracking users. It is not sent to external analytics tools such as Google Analytics either.
        </p>
        <p>
          It is not sent from browsers with Global Privacy Control (GPC) enabled (a supporting browser or extension is required).
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Provision to Third Parties
        </h2>
        <p class="mb-3">
          We do not provide personal information to third parties without the User's consent, except in the following cases:
        </p>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>When it is necessary to protect the life, body or property of a person and it is difficult to obtain the person's consent</li>
          <li>When it is necessary for public health or the sound upbringing of children and it is difficult to obtain the person's consent</li>
          <li>When cooperation is needed for a national agency, a local government, or a party entrusted by them to carry out duties prescribed by law, and obtaining the person's consent is likely to impede those duties</li>
          <li>When permitted by the Act on the Protection of Personal Information or other laws</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Privacy Protection and Security Measures
        </h2>
        <p class="mb-3">
          The Administrator takes necessary and appropriate safety measures to prevent leakage, loss or damage of the personal information handled and to manage it securely. Examples include:
        </p>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>All communication is encrypted with HTTPS</li>
          <li>Post content goes directly from your browser to the destination service and does not pass through this Service's server</li>
          <li>The last-used destination server is stored only in your browser</li>
          <li>"Information collected through HTTP access", including IP addresses and User-Agents, is kept for 90 days and promptly and completely deleted after that period</li>
        </ul>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Users' Rights
        </h2>
        <p class="mb-3">
          Users have the following rights:
        </p>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>To request disclosure of personal information</li>
          <li>To request correction or deletion of personal information</li>
          <li>To request suspension of use</li>
        </ul>
        <p class="mb-3">
          When a User requests to exercise these rights and the Administrator determines that it is necessary to respond, the Administrator will respond without delay.
        </p>
        <p class="mb-3">
          Requests for disclosure of personal information are handled as follows:
        </p>
        <ul class="list-disc list-inside mb-4 space-y-2 ml-4">
          <li>An administrative fee of up to 1,000 yen per request may be charged</li>
          <li>We may withhold all or part of the information if disclosure would violate laws, significantly affect the provision of this Service, or risk harming the life, body or property of a person</li>
        </ul>
        <p>
          To exercise these rights, please use the contact information below.
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Changes to This Policy
        </h2>
        <p>
          This policy may be changed without notice. We will announce significant changes on this Service.
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-4">
          Contact
        </h2>
        <p>
          For exercising your rights, and for complaints or inquiries about privacy, please contact us <a
            href="https://highemerly.net/contact.html"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-800 underline"
          >here</a>.
        </p>
      </div>
    </article>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()
</script>
