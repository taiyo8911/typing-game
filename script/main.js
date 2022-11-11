"use strict";

// タイピングするワードリスト
const wordList = ["action", "activity", "add", "address", "agree", "area", "below", "body", "break", "build", "button", "call", "change", "check", "child", "choose", "class", "clean", "close", "compare", "complete", "copy", "correct", "create", "describe", "description", "detail", "email", "event", "example", "extra", "false", "final", "find", "finish", "follow", "form", "free", "get", "group", "health", "improve", "include", "information", "introduce", "join", "key", "language", "later", "line", "list", "make", "match", "menu", "message", "model", "move", "name", "next", "number", "object", "open", "parent", "password", "play", "post", "prepare", "problem", "product", "read", "return", "rule", "run", "section", "see", "send", "service", "set", "show", "size", "software", "space", "start", "statement", "stop", "style", "test", "traffic", "tree", "true", "use", "useful", "user", "visit", "wait", "website", "window", "write", "you", "your"];

// 答え（対になる）ワードリスト
const meanList = ["アクション、操作", "アクティビティー、活動", "追加する", "アドレス、住所", "同意する", "領域、エリア", "下記に", "本体、本文", "中断する", "構築する／ビルド", "ボタン", "呼び出す", "変更する", "確認する、チェックする", "子", "選択する", "クラス", "きれいな／きれいにする", "閉じる", "比較する", "完了する／完全な", "コピーする／コピー", "正確な／訂正する", "作成する", "説明する", "説明", "詳細", "メール／メールを送る", "イベント、出来事", "例", "余分な、追加の", "誤りの、偽の", "最終の", "検索する", "終了する、完了する", "従う、フォローする", "フォーム", "空きの、無料の", "獲得する、取得する", "グループ", "ヘルス、正常性", "改良する、改善する", "含む、インクルードする", "情報", "導入する、紹介する", "結合する", "キー", "言語", "後で", "行、線", "リスト／一覧表示する", "作成する", "一致する", "メニュー", "メッセージ", "モデル、型", "移動する", "名前", "次の", "数", "オブジェクト、物体、対象", "開く／開いた", "親", "パスワード", "再生する", "書き込む／投稿", "準備する", "問題", "製品、プロダクト", "読み取る", "戻す、返す", "ルール、規則", "実行する", "セクション、部分", "見る、参照する", "送信する", "サービス", "設定する", "表示する", "大きさ", "ソフトウェア", "スペース、空白", "開始する", "ステートメント、文", "停止する", "スタイル", "テスト／テストする", "トラフィック、通信（量）", "木、ツリー", "正しい、真の", "使う／使用", "便利な", "ユーザー", "訪問する、アクセスする", "待機する", "ウェブサイト", "ウィンドウ", "書き込む", "あなた、ユーザー", "あなたの、ユーザーの"];

// ゲームループの回数設定
const LOOP_TIMES = 30;

// ワードの表示要素取得
const wordElem = document.getElementById('word');
const meanElem = document.getElementById('mean');

// カウントの初期値表示
const countElem = document.getElementById('count');
countElem.textContent = LOOP_TIMES;

// 判定用の文字格納
let checkTexts = [];

// 終了フラグ
let isEnd = false;

// メイン関数 設定したループ数まで
function main() {
    if (!isEnd) {
        // ワードを表示
        createText();
        // キーボード入力を受け取る
        document.addEventListener('keydown', keyDown);
    }
    else {
        // 終了メッセージを表示する
        const messageElem = document.getElementById("message");
        messageElem.textContent = "END";
        wordElem.textContent = "END";
        meanElem.textContent = "";
    }
}


// ワードを表示する関数
function createText() {
    // ワードを初期化
    word.textContent = "";

    // 乱数を取得
    let rnd = Math.floor(Math.random() * wordList.length);

    // タイピングが正しいか判定するためにワードを1文字ずつ分割
    checkTexts = wordList[rnd].split('').map(function (value) {
        let span = document.createElement('span');
        span.textContent = value;
        word.appendChild(span);
        return span;
    });

    // 意味の表示
    mean.textContent = meanList[rnd];
}


// キーボード入力を判定する
function keyDown(e) {
    // キーボードからの入力は「e.key」に格納されている
    if (e.key === checkTexts[0].textContent) {
        // 入力が正しかったら文字色を変える
        checkTexts[0].className = 'changeColor';

        // 0番目の配列要素を削除して次の1文字を比較対象にする
        checkTexts.shift();

        // すべての入力が終わったら
        if (!checkTexts.length) {
            // 次の問題を出す
            createText();
            // カウントダウンをする
            countDown();
        }
    }
    else {
        // 入力が違っていたら文字をブルブルさせる
        checkTexts[0].className = 'buruburu';
    }
}

// カウントダウン関数
function countDown() {
    let num = countElem.textContent;
    // カウントを数値に変換して比較
    num = parseInt(num);
    if (num === 1) {
        isEnd = true;
        main();
    }
    else {
        // カウントダウンする
        num -= 1;
        countElem.textContent = num;
    }
}