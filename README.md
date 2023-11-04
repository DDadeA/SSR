# SSR
Simple Script for Reactive website
인터렉티브 사이트 제작을 위한 스크립트

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
- **index.html** - 필요한 스크립트 및 스타일시트를 불러옵니다.
- **ssr.js** - 뼈대가 되는 스크립트
- **style.css** - 기본 스타일 작성
- **base_layout.js** - 객체 작성
- **loader.js** - 강제 캐시 방지

주로 수정하는 파일은 `base_layout.js`, `style.css` 입니다.

 
## 예제 1
예제 1에서는 간단한 선택지 게임을 작성합니다.
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
`base_layout.js`를 열어 각 객체 작성을 시작합니다.

```javascript
let main_div = document.createElement('div');
main_div.id = 'main_div';
document.body.appendChild(main_div);

const text1 = '당신이 한가로이 누워 창 밖을 내다보던 도중...';
const text2 = '갑자기 눈 앞이 깜깜해지며 엄청난 충격이 느껴졌습니다.';
const text3 = '다시 시야가 트이고 직감적으로 느낀 것은';
const text4 = '당신을 자신의 아이로 삼은 한 날씨의 존재였습니다.';
const text5 = '기묘한 축복의 느낌과 함께 당신이 창 밖에서 마주한 날씨는...';
```

# ENGLISH
## Quick start

There is no dependency. Just pure javascript.

`git clone https://github.com/DDadeA/SSR`

## Basic structure
The program consists of
 - index.html
 - ssr.js
 - style.css
 - base_layout.js
 - etc
 
## Example




# Reference
- 와카몰루. (2023, July 15). 날씨의 아이 - CYOA 채널. 아카라이브. https://arca.live/b/cyoa/81180945
