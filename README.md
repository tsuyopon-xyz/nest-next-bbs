## このレポジトリは学習者向けに作られたレポジトリです

このレポジトリは、Web開発の「**フロントエンド**」「**バックエンド**」「**デプロイ**」のスキルを身につけてもらうために作った学習用レポジトリです。


## 【動画】このレポジトリで実装できるアプリの紹介

以下の画像をクリックするとYouTubeに移動します。

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/V9O4YOJXjtA/0.jpg)](https://www.youtube.com/watch?v=V9O4YOJXjtA)



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



## 実装手順

何から手をつければ良いかわからない方向けに、「このような順番で実装すれば良いよ」という流れを以下に記述しておきます。

> この開発の流れが絶対というわけではないので、以下の流れだと実装しづらいという場合はご自身の方法で進めていただけたらと思います。


1. フロントエンドとバックエンドを1つのレポジトリで管理する（モノレポ構成）
1. 【バックエンド】NestJSでAPIの開発環境の用意する
1. 【バックエンド】Dockerを使って、ローカルにRDBの環境を用意する（PostgreSQL）
1. 【バックエンド】DBのテーブル構成を考える
1. 【バックエンド】Prismaでテーブルを構築する（migration）
1. 【バックエンド】Prismaでテーブルを構築する（migration）
1. 【バックエンド】必要なAPIを洗い出す
1. 【バックエンド】API実装（ユーザー登録する機能）
1. 【バックエンド】ValidationPipeとDTOでバリデーションを楽にする
1. 【バックエンド】API実装（メール認証する機能）
1. 【バックエンド】API実装（ログインする機能）
1. 【バックエンド】トークン情報をCookieで管理する
1. 【バックエンド】Guardsを使って認証チェックをする
1. 【バックエンド】API実装（ログアウトする機能）
1. 【バックエンド】API実装（認証トークンをリフレッシュする機能）
1. 【バックエンド】API実装（パスワードリセットをリクエストする機能）
1. 【バックエンド】API実装（パスワードをリセットする機能）
1. 【バックエンド】API実装（投稿作成する機能）
1. 【バックエンド】API実装（投稿一覧を取得する機能）
1. 【バックエンド】API実装（投稿削除する機能）
1. 【フロントエンド】Next.jsでフロントエンドの開発環境を用意する
1. 【フロントエンド】3つのページを用意する（新規登録、ログイン、投稿一覧）
1. 【フロントエンド】全ページで共通して使うコンポーネントを作成する（Layout, Header, Footer）
1. 【フロントエンド】Redux Toolkitの雛形を用意する
1. 【フロントエンド】新規登録ページに必要なコンポーネントを用意する
1. 【バックエンド】特定のURLからのアクセスのみを許可する（CORSの設定）
1. 【フロントエンド】Redux Toolkitでユーザー登録の状態を管理する
1. 【フロントエンド】ログインページに必要なコンポーネントを用意する
1. 【フロントエンド】Redux Toolkitでログインの状態を管理する
1. 【フロントエンド】Headerにログアウトボタンを用意する
1. 【フロントエンド】Redux Toolkitでログアウトの状態を管理する
1. 【フロントエンド】未ログイン時のリダイレクト処理を実装する
1. 【フロントエンド】投稿一覧を取得する（RTK Queryを利用）
1. 【フロントエンド】取得した投稿一覧を表示する
1. 【フロントエンド】投稿一覧のページング機能を実装する（react-paginateを利用）
1. 【フロントエンド】投稿フォームを用意する
1. 【フロントエンド】新規投稿する（RTK Queryを利用 + キャッシュのリセット）
1. 【フロントエンド】既存の投稿を削除する（RTK Queryを利用 + キャッシュのリセット）
1. 【フロントエンド】ページアクセス時に認証トークンをリフレッシュする（Redux ToolkitのSliceを利用）
1. 【デプロイ + バックエンド】Heroku パイプラインを使う準備をする
1. 【デプロイ + バックエンド】プルリクエスト作成時、レビューアプリが自動デプロイされるのを確認する
1. 【デプロイ + バックエンド】プルリクエストをクローズすると、自動でレビューアプリが削除されるのを確認する
1. 【デプロイ + バックエンド】GitHubのmainブランチ更新時に、バックエンドが自動デプロイされるのを確認する
1. 【デプロイ + フロントエンド】VercelとGitHubレポジトリを連携して、ビルド設定をカスタマイズする
1. 【デプロイ + フロントエンド】プルリクエストを作成すると、自動でレビューアプリが作成されるのを確認する
1. 【デプロイ + フロントエンド】プルリクエストをクローズすると、自動でレビューアプリが削除されるのを確認する
1. 【デプロイ + フロントエンド】GitHubのmainブランチ更新時に、フロントエンドが自動デプロイされるのを確認する
