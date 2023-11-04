//@ts-check
import {ssr, update} from './ssr.js';
import {p, table, thead, row, imgRow, img} from './base_layout.js';


// Main div
let mainDiv = document.createElement('div');
mainDiv.id = 'mainDiv';
document.body.appendChild(mainDiv);

// 코드 작성 시작
// 각 객체의 겉모습을 만들어줍니다.  p() 함수는 <p> 글자 객체를 반환합니다.
let text1HTML = p('당신이 한가로이 누워 창 밖을 내다보던 도중...');
let text2HTML = p('갑자기 눈 앞이 깜깜해지며 엄청난 충격이 느껴졌습니다.');
let text3HTML = p('다시 시야가 트이고 직감적으로 느낀 것은');
let text4HTML = p('당신을 자신의 아이로 삼은 한 날씨의 존재였습니다.');

// 다음처럼 작성해도 무방합니다.
let text5HTML = document.createElement('p');
text5HTML.innerHTML = '기묘한 축복의 느낌과 함께 당신이 창 밖에서 마주한 날씨는...';


// 객체를 작성합니다. 이 때 객체의 속성을 같이 정의합니다.
let text1 = new ssr('text1', text1HTML) // 첫 번째는 id, 두 번째는 겉모습입니다. id는 고유한 값을 가져야하고, 규칙을 따라야합니다. (띄어쓰기x)
    .addTag('narrationText')            // narrationText라는 태그(=class)를 추가합니다. 스타일을 정의하는데 쓸 수 있습니다.
    .append(mainDiv);                   // 메인 div에 배치합니다..

let text2 = new ssr('text2', text2HTML).addTag('narrationText').append(mainDiv);
let text3 = new ssr('text3', text3HTML).addTag('narrationText').append(mainDiv);
let text4 = new ssr('text4', text4HTML).addTag('narrationText').append(mainDiv);
let text5 = new ssr('text5', text5HTML).addTag('narrationText').append(mainDiv);


// 선택지의 겉모습도 제작합니다.
// 이미지, 글씨를 하나로 묶기 위해서 표로 제작하겠습니다. 일반 Div로 제작해도 좋습니다.

const link1 = 'https://miro.medium.com/v2/resize:fit:12032/1*I5VKjKJS0ukKWruAQ04k6A.jpeg';
const link2 = 'https://cdn.pixabay.com/photo/2020/06/18/07/56/railing-5312344_960_720.jpg';
const link3 = 'https://psu-gatsby-files-prod.s3.amazonaws.com/s3fs-public/styles/16_9_1000w/public/1_3.png';
const link4 = 'https://cdn-images-1.medium.com/v2/resize:fit:1000/1*AytvczqWgW-V1imygKwiRQ.jpeg';

let sunnyHTML = table(
    thead('태양'),      // table header
    [imgRow(link1)]     // table row를 담은 array
    )
let rainHTML = table( thead('비'), [imgRow(link2)] )
let lightningHTML = table( thead('마른 벼락'), [imgRow(link3)] )


// 위 구조도 다음과 같이 작성 가능합니다. (간결함을 위해 문자열로 작성)
let heavyRainHTML = document.createElement('table');
heavyRainHTML.innerHTML = '<thead><tr><th>폭풍우</th></tr></thead>';
heavyRainHTML.innerHTML += `<tbody><tr><td><img src="${link4}"></td></tr></tbody>`;


// 객체를 정의합니다.

// 객체들을 담을 틀을 제작합니다.
let container = document.createElement('div');
container.id = 'container';             // 스타일 적용을 위한 id 설정
document.body.appendChild(container);   // 메인에 배치

let sunny = new ssr('sunny', sunnyHTML)
.addTag('selection')    // 스타일 변경을 위한 태그(=class)를 달아줍니다.
.setSelectable(false)   // 선택 가능하도록 설정합니다. false는 초기 선택 여부입니다.
.append(container);     // 틀 안에 넣어줍니다.

// 나머지 객체도 정의합니다.
let rain = new ssr('rain', rainHTML).addTag('selection').setSelectable(false).append(container);
let lightning = new ssr('lightning', lightningHTML).addTag('selection').setSelectable(false).append(container);
let heavyRain = new ssr('heavyRain', heavyRainHTML).addTag('selection').setSelectable(false).append(container);


update();