# SSR
Simple Script for Reactive website
인터렉티브 사이트 제작을 위한 스크립트

사실 다른 라이브러리를 사용하는 것이 훨씬 좋습니다.

이것은 실험적인 프로젝트입니다.

## Link
- [Korean Description](./#Korean)
- [English Description](./#English)
- [Reference](./#Reference)

---
# Korean
## 시작하기
`git clone https://github.com/DDadeA/SSR`

스태틱 사이트입니다.
선호하는 방식으로 호스팅하면 됩니다.


## 기본구조
이 스크립트는 다음과 같이 구성되어 있습니다.
- **index.html** - 스크립트 및 스타일시트 로드
- **ssr.js** - 메인 스크립트
- **base_layout.js** - HTML 객체 뼈대
- **main_content.js** - 객체 작성
- **style.css** - 기본 스타일 작성

주로 수정하는 파일은 `main_content.js`, `style.css` 입니다.

 
## 예제 1
[데모 페이지](https://aseli.o-r.kr/son_of_weather/)입니다.

예제 1에서는 간단한 선택지 게임을 제작합니다.

원작(와카몰루, 2023)은 다음 이미지입니다.

![original](https://i.imgur.com/RAttxmn.png)

### 1. 계획
처음에 몇 개의 텍스트가 배치됩니다.
시각 묘사가 포함되어 있기 때문에, 이를 잘 살려서 연출하면 좋을 것 같습니다.

날씨를 테마로 총 4가지 선택지가 존재합니다. 각 선택지의 분위기를 잘 살려서 디자인하면 좋을 것 같습니다.

각 선택지는 동시에 선택 불가능하도록 그룹 설정을 해줍니다.

텍스트 양이 많기 때문에, 선택한 선택지의 설명만 나오면 읽기 편할 것 같습니다.

마지막 텍스트는 결정을 누른 후에 나타나면 연출적으로 아름다울 것 같습니다.

### 2. 객체 만들기
`main_content.js`를 열어 각 객체 작성을 시작합니다.

```javascript
//@ts-check
import {ssr, update} from './ssr.js';
import {p} from './base_layout.js';

let mainDiv = document.createElement('div');
mainDiv.id = 'mainDiv';
document.body.appendChild(mainDiv);

// 코드 작성 시작
// 각 객체의 겉모습을 만들어줍니다.  p() 함수는 <p> 글자 객체를 반환합니다.
let text1HTML = p('당신이 한가로이 누워 창 밖을 내다보던 도중...');

// 객체를 작성합니다. 이 때 객체의 속성을 같이 정의합니다.
let text1 = new ssr('text1', text1HTML)
.addTag('narrationText')    // 내레이션이라는 태그(=class)를 추가합니다. 스타일을 정의하는데 쓸 수 있습니다.
.append(mainDiv);           // 메인 div에 넣습니다.


update();
```


---
나머지 글자들도 모두 추가합니다.
```javascript
//...
// 각 객체의 겉모습을 만들어줍니다
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
//...
```
**실행결과**

![](https://i.imgur.com/7Pk8Wsr.png)

---
선택지 객체도 작성하겠습니다.
```javascript
// 선택지의 겉모습도 제작합니다.
// 이미지, 글씨를 하나로 묶기 위해서 표로 제작하겠습니다. 일반 Div로 제작해도 좋습니다.

const link1 = './img/1.jpg';
const link2 = './img/2.png';
const link3 = './img/3.png';
const link4 = './img/4.jpg';

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
mainDiv.appendChild(container);   // 메인에 배치

let sunny = new ssr('sunny', sunnyHTML)
.addTag('selection')    // 스타일 변경을 위한 태그(=class)를 달아줍니다.
.setSelectable(false)   // 선택 가능하도록 설정합니다. false는 초기 선택 여부입니다.
.setName('weather')     // 복수 선택을 막기 위해 이름을 넣어줍니다.
.append(container);     // 틀 안에 넣어줍니다.

// 나머지 객체도 정의합니다.
let rain = new ssr('rain', rainHTML).addTag('selection').setSelectable(false).setName('weather').append(container);
let lightning = new ssr('lightning', lightningHTML).addTag('selection').setSelectable(false).setName('weather').append(container);
let heavyRain = new ssr('heavyRain', heavyRainHTML).addTag('selection').setSelectable(false).setName('weather').append(container);

```

결과창

![](https://i.imgur.com/t1HW9tm.png)

---
### 3. 스타일 정의
크기가 엉망이기 때문에, 스타일을 정의하겠습니다.
```css
input, label.selection > a {
    visibility: collapse;
    width: 0;
    height: 0;
}
#mainDiv {
    width: 100%;
}


/* 텍스트 */
.narrationText {
    min-width: 100%;
    color: #111;
    font-size: larger;
    font-weight: bold;
    text-align: center;
}

#container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;

    gap: 2vw;
    row-gap: 4vw;

    * {
        max-width: 40vw;
        max-height: 40vw;
        overflow: hidden;
    }
}

table {
    width: 40vw;
    height: 40vw;
    border: #111 2px solid;
    background-color: #eee;

    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    transition: 0.5s;

    thead {
        color: #111;
        font-size: 2vw;
    }
}
input:checked + table {
    background-color: #aaa;
}

```
적당히 틀이 나왔습니다.
![](https://i.imgur.com/E4882ns.png)

---
선택지를 선택했을 때 나올 결과 메세지도 만듭니다.
```javascript
// 결과 메세지를 정리합니다.
const sunnyResult = '맑게 ...니다.';
const rainResult = '비가 내릴...니다.';
const lightningResult = '3번 ...니다.';
const heavyRainResult = '확정...니다.'

const resultDictionary = {'sunny':sunnyResult,
                          'rain':rainResult,
                          'lightning':lightningResult,
                          'heavyRain':heavyRainResult}

// 결과 메세지를 만드는 함수를 제작합니다.
function getResult() {
    // ssr.js의 selectedId Array에는 선택된 선택지의 id가 담겨져있습니다.
    // 선택지는 중복 선택 불가능한 4개, 첫 번째 요소가 선택한 id입니다.
	
	// 선택된 0번째 요소가 4개 중 하나가 아니라면 => 빈 칸으로 업데이트
    if(!['sunny', 'rain', 'lightning', 'heavyRain'].includes(selectedId[0])) return blank();

    let returnDisplay = p(resultDictionary[selectedId[0]]);
    returnDisplay.id = 'resultMessage';
    return returnDisplay;
}

// 결과 메세지 객체를 작성합니다.
let resultMessage = new ssr('resultMessage', blank()) // 초기 겉모습은 빈칸입니다.
    .setUpdatable(getResult) // 업데이트 시 마다 변경을 원하는 HTML 객체를 반환하는 함수를 넣어줍니다.
    .append(mainDiv);
```

이와 같은 방식으로 작성할 수 있습니다.
자세한 코드는 `/example`을 확인해주세요.

# ENGLISH
update soon
# Reference
- 와카몰루. (2023, July 15). 날씨의 아이 - CYOA 채널. 아카라이브. https://arca.live/b/cyoa/81180945
