# Road to AP（応用情報技術者試験サポートアプリ）

このプロジェクトは、応用情報技術者試験の学習をサポートする Web アプリケーションです。試験日までの残り日数の表示や、AI によるクイズ出題機能などを提供します。

---

## 主な機能

- **残り日数の表示**  
  試験日までの日数をリアルタイムで表示します。

- **クイズ機能**  
  Gemini API を利用し、IT 用語に関するクイズを自動生成します。回答入力・正誤判定も可能です。

- **用語の言語化機能（開発中）**  
  指定された IT 用語の意味や説明に対し、ユーザーがマイクを通して音声で説明します。

---

## 使用技術

- **フロントエンド**: React, TypeScript
- **スタイリング**: Tailwind CSS, Material-UI
- **AI/ユーティリティ**: Google Generative AI (Gemini), date-fns, Firebase

---

## セットアップ方法

### 必要条件

- Node.js (16.x 以上推奨)
- npm または yarn

### インストール

```bash
git clone https://github.com/your-username/road-to-ap.git
cd road-to-ap
npm install
```
