# 生成AIが出力した試験用語をFirebaseに登録する
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# サービスアカウントキーのパスを指定
cred = credentials.Certificate("")  # ファイル名は適宜変更
firebase_admin.initialize_app(cred)

db = firestore.client()

it_terms = [
    "E-R図",
    "関係スキーマ",
    "正規形 (第一正規形)",
    "正規形 (第二正規形)",
    "正規形 (第三正規形)",
    "BCNF (ボイスコッド正規形)",
    "トランザクションログ",
    "コミットメント制御",
    "ロールバック",
    "排他ロック",
    "デッドロック",
    "インデックス (B+木)",
    "インデックス (ハッシュ)",
    "外部キー",
    "参照整合性制約",
    "SQLインジェクション",
    "クロスサイトスクリプティング (XSS)",
    "ディジタル署名",
    "公開鍵暗号",
    "共通鍵暗号",
    "ハッシュ関数",
    "MAC (Message Authentication Code)",
    "PKI (Public Key Infrastructure)",
    "SSL/TLS",
    "IPsec",
    "ルーティングプロトコル (RIP)",
    "ルーティングプロトコル (OSPF)",
    "サブネットマスク",
    "CIDR (Classless Inter-Domain Routing)",
    "NAT (Network Address Translation)",
    "DHCP (Dynamic Host Configuration Protocol)",
    "SNMP (Simple Network Management Protocol)",
    "SMTP (Simple Mail Transfer Protocol)",
    "POP3 (Post Office Protocol version 3)",
    "IMAP (Internet Message Access Protocol)",
    "SaaS (Software as a Service)",
    "PaaS (Platform as a Service)",
    "IaaS (Infrastructure as a Service)",
    "仮想マシン (VM)",
    "コンテナ (Docker)",
    "オーケストレーション (Kubernetes)",
    "CI/CD (Continuous Integration/Continuous Delivery)",
    "リポジトリ (Git)",
    "ブランチ (Git)",
    "マージ (Git)",
    "スクラム",
    "カンバン",
    "WBS (Work Breakdown Structure)",
    "PERT図",
    "ファンクションポイント法",
]

# Firestoreに用語を1つずつ登録
for term in it_terms:
    db.collection("itTerms").add({"term": term})
    print(f"登録完了: {term}")