// Component presets
load_script('base_layout');


// Main div
let main_div = document.createElement('div');
main_div.id = 'main_div';
document.body.appendChild(main_div);



// 각 컴포넌트를 작성해줍니다. 
// function p(text:String)
let text1HTML = p('당신이 한가로이 누워 창 밖을 내다보던 도중...');
let text2HTML = p('갑자기 눈 앞이 깜깜해지며 엄청난 충격이 느껴졌습니다.');
let text3HTML = p('다시 시야가 트이고 직감적으로 느낀 것은');
let text4HTML = p('당신을 자신의 아이로 삼은 한 날씨의 존재였습니다.');

let text5HTML = p('기묘한 축복의 느낌과 함께 당신이 창 밖에서 마주한 날씨는...');

update()