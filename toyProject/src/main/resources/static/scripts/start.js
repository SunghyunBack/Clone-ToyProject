// const는 변수를 상수를 만들어주는 개념, querySelector는 문서에서 css의 선택자에 대응하는것을 선택한다.
const main = document.querySelector('#main');
//  main이라는 상수로 html안에 태그 안 id의 값이 mian인 태크를 지정한다.
const qna = document.querySelector('#qna');
//  qna라는 상수로써 html안의 태그 속성중 id의 값이 qna인 태그를 지정한다.
const endPoint = 12;
// 상수 endPoint는 변수이면 12라는 int값을 가지면 프로젝트 중 진행 상황에 대한 값을 표시하기위한 값을 위해 만들었다.
const result = document.querySelector('#result');
//  result라는 상수로써 html안의 태그 속성중 id의 값이 result인 태그를 지정한다.
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// 결과를 나타내는 알고리즘을 만들기 위해서 다음과 같이 길이가 12인 배열을 만들었다.



// 미리 만들어 놓은 select배열중 전개구문을 사용해 가장 값이 큰 값을 result에 반환후 호출한다.
calResult = () => {
 var result = select.indexOf(Math.max(...select));
    return result;
}
// j는 타입에 대한 반복, k는 pointArray를 반복한다.





setResult = () => {
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    // 각각 html파일에 id값이 resultImg의 요소를 지정한다.
    // img태그의 scr, alt값을 다음과 같이 설정한다.
    // appendChild메서드를 통해 앞의 내용을 가진  img태그를 id값이 resultImg태그의 자식으로 추가한다.
    const imgDiv = document.querySelector('#resultImg');
    var resultImg = document.createElement('img');
    resultImg.src = imgURL;
    resultImg.alt = point;
    var imgURL = '../static/resources/img/image-' + point + '.png';
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    // html파일의 클래스 값중 resultDesc를 선택해 resultDesc변수이름으로 담는다.
    // innerHTML메서드를 통해 data.js파일 안 infoList변수 point번째 desc값을 가져온다.
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}



// addAnswer함수는 answerText, qIdx, idx의 매개변수를 가지며 goNext함수에 영향을 미친다.
//  html파일안 class값이 answerBox의 요소의 자식으로 button태그 (아래의 class값을 추가하여)만든다.
//  asnwerText는 답변 버튼에 담길 text내용이다. 이를 answer요소의 내부 html 내용에 담는다.

//  만들어진 answer 답변중 클릭시 진행될 일을 코드로 만든것이다.
// 만들어진 클래스의 값이 answerList인 답변들을 모두 children에 할당한다.
// 버튼클릭스 클릭에 해당하는 children버튼의 [i]값을 찾아 비활성화 하고  그 버튼에 해당하는 type을 순회하면서
// 순회한 값들의 위치를 select의 동일한 위치에 +1을 해준다.
// 그후 다음 질문으로 넘어간다.
addAnswer = (answerText, qIdx, idx) => {
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", () => {
        var children = document.querySelectorAll('.answerList');
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;  // 버튼 비활성화
            children[i].style.WebkitAnimation = 'fadeOut 0.5s';
            children[i].style.animation = 'fadeOut 0.5s';
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select[target[i]] += 1;
            }

            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}
// createElement는 지정한 태크의 html요소를 만들어 반환한다.




//  goNext 이름을 가진 함수로써 전역변수로써 qIdx를 가진다. 그리고 만약 qIdx가 12인 경우 이 함수를 빠져나온다.
// q라는 변수는 html안의 속성중 class의 이름이 qBox의 태그를 가진다.
// data.js파일안 qnaList값중 qIdx번째 q키를 가지고와 html파일에 class값이 qBox인 요소에 가져온다.
//  반복문을 통해 data.js파일안 qnaList값중 qIdx번째 a키를 가지고와 a키의 길이만큼 값들을 html파일에 class값이 qBox인 요소에 가져온다.
//  가져올때 addAnser의 함수를 통해 qnaList[qIdx].a[i].answer은 질문에 대한 답변의 내용을
//  qIdx는 현재 질문의 인덱스를 i는 답변의 인덱스를 전달한다.
// status는 전체 질문을 통해 내가 지금 얼만큼 진행했는지를 위한 코드이다.
//  전체 길이를 endpoint로 나눈후 그 값에 현재 내 페이지의 질문 순서의 값만큼 곱한후 값을 '%'로 전달한다.

goNext = (qIdx) => {
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    // innerHTML은 요소내에 포함된 html,xml 마크업을 가져오거나 설정한다.
    q.innerHTML = qnaList[qIdx].q;
    for (let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx,i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}







//  main페이제에서 (시작하기)버튼을 누르면 다음으로 넘어가기 위한 js코드이다.
//  begins 이름을 가진 함수이며 setTimeout는 만료된 후 함수나 지정한 코드 조각을 실행하는 타이머를 설장한다.
//  시작 버튼을 누르면 4.5초동안 main화면이 none이 되고 qna화면이 block이된다.
// 그후 애니메이션 효과로 qna화면이 fadeIn되며 main화면이 fadeOut이 된다.
// qna화면에서 질문에 대한 버튼을 누를시 4.5초의 시간을 가진다는 의미를 가진다.
begins = () => {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)

        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}
// 위의 begins와 역활이 비슷한다. 모든 질문이 끝난후 마지막 화면인 id의 값이 result의 화면으로 전환해준다.
goResult = () => {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})
    setResult();
}
