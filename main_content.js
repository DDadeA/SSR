//@ts-check
import {ssr, update, selectedId, selectables} from './ssr.js';
import {p, table, thead, imgRow, blank} from './base_layout.js';

// define functions
let beforeUpdate = ()=>{};
let afterUpdate = ()=>{};

// Main div
let mainDiv = document.createElement('div');
mainDiv.id = 'mainDiv';
document.body.appendChild(mainDiv);



// Start of code

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


// 결과 메세지를 정리합니다.
const sunnyResult = '맑게 갤 확률이 높아지며 일주일 중 적어도 3일은 맑습니다.\n고귀하고 존재감을 높이는 오오라를 가집니다.(On/Off 가능)\n주변의 사특한 것을 물리치고 차단합니다.\n주변이 밝고 날씨가 맑을수록 신체능력이 3배까지 증폭됩니다.';
const rainResult = '비가 내릴 확률이 높아지며, 일주일 중 적어도 3일은 비가 내립니다.\n진중하고 존재감을 낮추는 오오라를 가집니다.(On/Off 가능)\n주변 10m 내의 수분을 조종할 수 있습니다.\n주변이 어둡고 비가 세차게 내릴 수록, 최대 3배까지 사고능력이 증폭됩니다/';
const lightningResult = '3번 안에 원하는 주사위 면이 한 번은 나올 정도로 운이 좋아집니다.\n마른 벼락을 목격한 횟수만큼 시간을 5분 동안 정지할 수 있습니다.\n자신의 모든 속도를 0.5배에서 1.5배까지 조정할 수 있습니다.';
const heavyRainResult = '확정된 결과를 무작위로 변경 가능합니다.\n폭풍우가 치는 날은 모든 능력이 대폭 상승합니다.\n주변의 재앙을 모으거나, 자신의 재양을 흘릴 수 있습니다.'

const resultDictionary = {'sunny':sunnyResult,
                          'rain':rainResult,
                          'lightning':lightningResult,
                          'heavyRain':heavyRainResult}

// 결과 메세지를 만드는 함수를 제작합니다.
function getResult() {
    
    
    // ssr.js의 selectedId Array에는 선택된 선택지의 id가 담겨져있습니다.
    // 선택지는 중복 선택 불가능한 4개, 첫 번째 요소가 선택한 id입니다.
    if(!['sunny', 'rain', 'lightning', 'heavyRain'].includes(selectedId[0])) return blank();

    // 배경 애니메이션 추가
    let videoElement = document.getElementById('vId');

    videoElement.children[0].src = `./vid/${selectedId[0]}.webm`;
    videoElement.pause();
    videoElement.load();
    videoElement.play();

    videoElement.style.animation = 'showUp 1s forwards';
    videoElement.getAnimations().forEach((a)=>a.play());

    let returnDisplay = p(resultDictionary[selectedId[0]]);
    returnDisplay.id = 'resultMessage';
    return returnDisplay;
}

// 결과 메세지 객체를 작성합니다.
let resultMessage = new ssr('resultMessage', blank()) // 초기 겉모습은 빈칸입니다.
    .setUpdatable(getResult)
    .append(mainDiv);
    // 업데이트 시 마다 변경을 원하는 HTML 객체를 반환하는 함수를 넣어줍니다.

// 매 업데이트 시마다 실행할 함수를 작성합니다.
afterUpdate = ()=> {
    // 선택지를 눌렀을 때, 안내 메세지 쪽으로 스크롤 되도록 합니다.
    if (selectedId.length>0) { window.location.replace('#resultMessage'); }
    
}


// 결과 버튼을 제작합니다.
const resultButtonDisplay = document.createElement('button');
resultButtonDisplay.innerHTML = '결정';
resultButtonDisplay.id = 'resultButton';

resultButtonDisplay.onclick = ()=> {
    // 선택지가 없는 경우 무시
    if(selectedId.length==0) return

    const finalSelection = selectedId[0];
    for(const id in selectables){
        // 선택된 요소 이외 모두 삭제
        if(finalSelection!=id){
            let target = selectables[id].display;

            // 삭제 애니메이션
            target.style.animation = 'disappear 0.5s cubic-bezier(0,.76,.07,1.02)';
            setTimeout((e)=> {container.removeChild(e)}, 490, target);
        }   
    }

    // 삭제 애니메이션에 맞추어 그리드 조정
    setTimeout(()=> {
        document.getElementById('container').style.gridTemplateColumns = '1fr'    
        let finalText = p('솟아오르는 축복과 안정을 느끼며 당신은 날씨의 품에서 잠이 들었습니다...')
        mainDiv.appendChild(finalText);

        finalText.style.opacity = '0';
        finalText.style.marginBottom = '10vw';
        finalText.style.fontWeight = 'bolder'
        finalText.style.animation = 'showUp 3s forwards'

    }, 480);

    resultButtonDisplay.onclick = ()=>{}
};

let result = new ssr('resultButton', blank())
    .setUpdatable(()=>{
        if(selectedId.length>0) return resultButtonDisplay; // 선택된 것이 있을 경우에만 보이도록 설정
        return blank();
    })
    .append(mainDiv);



// 애니메이션 스킵 버튼을 제작합니다.
const skipButtonDisplay = document.createElement('button');
skipButtonDisplay.innerHTML = '>> SKIP';
skipButtonDisplay.id = 'skipButton';

let skipButton = new ssr('skipButton', skipButtonDisplay)
    .append(document.body);

skipButtonDisplay.onclick = ()=> {
    // 모든 애니메이션 즉시 완료
    for(let selection of mainDiv.children){ selection.getAnimations().forEach((animation)=>animation.finish()); }
    
    // 본인 삭제
    document.body.removeChild(skipButton.display);
}


// 시작 시에 스크롤을 처음 위치로 이동시킵니다.
window.location.replace('#');
window.scrollTo(0, 0);
window.scrollTo(0, 0);

// End of code
export { beforeUpdate, afterUpdate };
update();