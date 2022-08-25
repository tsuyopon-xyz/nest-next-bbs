## このレポジトリは学習者向けに作られたレポジトリです

このレポジトリは、Web開発の「**フロントエンド**」「**バックエンド**」「**デプロイ**」のスキルを身につけてもらうために作った学習用レポジトリです。


## このレポジトリで身につくスキル

このレポジトリで習得できるスキルは以下の通りです。

- フロントエンド
  - Next.js（React）を使ったフロントエンド開発
  - Redux Toolkit（状態管理）
    - 通常のReduxのようなState管理
    - RTK Queryを使ったAPIのやりとり & レスポンスデータのキャッシュとリセット
  - その他細かいところ
    - 環境変数の取り扱い方
    - 特定の文字列の置換（「http(s)://~」部分をリンカブルにする）
    - 未ログイン時のリダイレクト処理
    - リフレッシュトークンを使った、認証トークンの自動更新（ページ更新時）
- バックエンド
  - NestJSを使ったAPI開発
  - NestJSの環境変数の取り扱い方
  - Validation PipeとDTOを使った、リクエストボディのバリデーション処理
  - CORSの設定
  - Cookieを活用した認証トークンのやりとり
  - SendGridを使ったメール送信（ユーザー登録時のメール確認に利用）
  - Dockerを使ったローカルDBの構築（PostgreSQLを利用）
  - Prismaを使ったNestJSとDBの連携（ORM）
  - Prismaを使ったDBマイグレーション（テーブルの構築）
- デプロイ周り
  - Heroku
    - GitHubと連携した自動デプロイ
    - パイプラインの利用
    - 環境変数の設定
    - アドオンの利用（今回はPostgreSQLの無料利用枠を使っている）
  - Vercel
    - GitHubと連携した自動デプロイ
    - 環境変数の設定
    - モノレポ構成となっているので、Vercel上でビルド設定のカスタマイズが必要
    


> ざっと思い浮かんだものを羅列していますが、もしかしたら抜けているものもありません。



## 参考資料

僕が今まで作ってきた学習教材の中で、このレポジトリの学習に関連するものを以下にまとめておきます。

- フロントエンド
  - [（無料）React × Redux Toolkit × TypeScript勉強会](https://redux-toolkit-seminar-learning-materials.vercel.app/docs/intro/overview)
    - TypeScriptでのReactの書き方を学習できる
    - TypeScriptでのRedux Toolkitの書き方を学習できる
    - ReactとRedux Toolkitの連携方法を学習できる
  - [（無料）Next.js & TypeScript体験シリーズ](https://tsuyopon.xyz/learning-contents/web-dev/javascript/nextjs-and-typescript-experience-series/)
    - Next.jsの基本的な使い方や概念を学習できる
    - TypeScriptでのNext.jsの使い方を学習できる
  - [（無料）HTML&CSS速習教室](https://html-css-guide-five.vercel.app/)
    - HTMLとCSSの基本を学習できる
  - [（有料）Front Hacks](http://bit.ly/2ZpmGy8)
    - HTMLとCSSの基本を学習できる
    - JavaScriptの基本を学習できる
    - DOM操作を学習できる
    - Promise, async/awaitを使った非同期処理を学習できる
    - Node.jsの基本操作を学習できる
    - Reactを学習できる
    - Reduxを学習できる
    - Gitを学習できる
    - GitHubを学習できる
- バックエンド
  - [（無料）YouTubeの広告情報を自動収集する開発講座](https://tsuyopon.xyz/2022/01/05/yt-ads-scraping-online-seminar/)
    - NestJS, Docker, Prismaの学習ができる
  - [（無料）バックエンドの基本知識](https://tsuyopon.xyz/learning-contents/web-dev/basic-knowledge-of-backend/)
    - HTTPメソッド, HTTPステータスコードの意味がわかる
  - （無料）JavaScriptバックエンド編 > express【Webフレームワーク】 > APIサーバーを作る
    - [Webフレームワークの基本](https://tsuyopon.xyz/learning-contents/web-dev/javascript/backend/#Web)
      - ルーティングの概念を学習できる
    - [APIサーバーを作る](https://tsuyopon.xyz/learning-contents/web-dev/javascript/backend/#API)
      - HTTPメソッドに応じたルーティング処理、Postmanを使ったAPIの動作確認方法を楽手できる
- その他
  - [（無料）コマンドライン](https://tsuyopon.xyz/learning-contents/command-line/)
    - 基本的なコマンド操作を学習できる
  - [（無料）Git](https://tsuyopon.xyz/learning-contents/git/)
    - Gitの概念を学習できる
    - Gitの操作の細かい部分は「 [Front Hacks](http://bit.ly/2ZpmGy8) 」 で学習できる
  - [（無料）GitHub](https://tsuyopon.xyz/learning-contents/github/)
    - GitHubにコードをアップする方法やプルリクエストの作成方法を学習できる
    - GitHubの細かい部分は「 [Front Hacks](http://bit.ly/2ZpmGy8) 」 で学習できる
    
    
 ## このレポジトリを使った学習のサポートを希望される方へ
 
以下のLINE公式アカウントまでご連絡ください。
 
- [LINE公式アカウント](https://tsuyopon.xyz/lp/mail-magazine/)


> 上記ページの「LINE@への登録はこちらから」の部分のボタンからLINE公式アカウントに登録できます。
