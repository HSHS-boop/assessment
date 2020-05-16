'use strict'; //宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述（厳格モードを使う）
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllchildren(element) {
    while (element.firstChild) {
        // 子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {　//無名関数の記述法。assessmentButtonというオブジェクトのonclickというプロパティに設定することで、ボタンがクリックされた時に動くようにできる。
    const userName = userNameInput.value;
    if (userName.length === 0) { // ガード句
        // 名前が空の時は処理を終了する
            return; //戻り値なしにそこで処理を終了する
    }
    //診断結果表示エリアの作成
    //まず「診断結果」というh3見出しを作り、結果のdiv要素に追加。（→appendChild関数）
    //しかし、診断ボタンを複数回押したら結果も複数回出てくるので、
    // while文を使って制御。
    removeAllchildren(resultDivided);

    const header = document.createElement('h3'); // まず<h3></h3>のような要素を作成し、後からinnerText プロパティを用いてタグの中身を設定できる
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    // 次に、ｐで段落要素を作成して以前作成したassessment関数で診断結果の文字列を作成し、そのpタグ内の文字列として入れる。
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    removeAllchildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
        "https://twitter.com/intent/tweet?button_hashtag=" + 
        encodeURIComponent('あなたのいいところ') + 
        "&ref_src=twsrc%5Etfw" ;
    // URI(URL)の各要素について
    // https →URIのスキーム（リソースに到達するための手段を表したもの）。SSL/TLSで暗号化されたWebアクセスを意味する。
    // twitter.com →ホスト名
    // /intent/tweet →リソース名
    // ?以降→クエリ
    // クエリに日本語のような半角英数以外の文字を含めるには、URIエンコードを使う。
    // URIエンコードでは、URIのクエリに含めることのできない文字のために、
    // それらの文字を%から始まる16進数で表現して含めるようにするための変換方法。
    //  
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
if (event.key === 'Enter') {
    assessmentButton.onclick();
    }
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];




/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
// ↑上のコメントは、userNameという引数でユーザーの名前が文字列で渡され、戻り値は診断結果の文字列となることをJSDoc形式でコメントしている
// コメントでのインタフェースの定義は必須ではないが、可読性は高まる
function assessment(userName) {
    // TODO 診断結果を実装する
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) { // let はブロックスコープレベルなので、変数宣言としてはvarより安全。
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g , userName)
    return result;
}

// テストコード
console.assert(
    assessment('太郎') ===
        '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
console.assert(
    assessment('太郎')　=== assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)
