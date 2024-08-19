# 레트로한 끝말잇기 게임

html, css, javascript만을 이용해 구현한 간단한 끝말잇기 게임입니다.
Node.js로 프록시 서버를 실행한 후, 브라우저에서 게임을 즐길 수 있도록 구성되어 있습니다.

## 요구사항

이 게임을 실행하기 위해서는 이런게 필요합니다:
- [Node.js](https://nodejs.org/) (v14 이상 권장)
- "dependencies": {
    "axios": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  }
- 표준국어대사전 api키 -> (https://stdict.korean.go.kr/openapi/openApiInfo.do) 에서 발급 가능

## 설치 및 실행 방법

1. 이 저장소를 클론합니다:

   git clone https://github.com/Wonchang0314/wordRelayGame.git
   cd wordRelayGame

2. 발급받은 개인 api키를 server.js에 입력합니다.
   ```js
   const url = `https://stdict.korean.go.kr/api/search.do?certkey_no=&key=${apiKey}&type_search=search&req_type=json&q=${word}`;
   ```
   
3. 프록시 서버를 실행합니다.
   node server.js

4. 프록시 서버가 실행된 후, 웹사이트를 실행합니다.
   index.html을 두 번 클릭하거나, VSCode 등에서 "Live Server" 플러그인을 사용하여 실행할 수 있습니다.

##

## 게임 규칙 설명
제한시간(10초)내에 단어를 입력합니다. </br>
끝말잇기에 한번 성공할때마다 10점씩 획득합니다.  </br>
반면, 입력된 단어가 끝말잇기 규칙에 위배(끝맛잇기가 안될때)되거나 이번판 이미 입력한 적이 있는 단어인 경우 목숨(하트)가 하나씩 줄어듭니다.  </br>
제한시간내에 단어를 입력하지 못하거나 목숨이 0개가 되는 순간 게임이 종료됩니다.

##

### 1. 시작화면
<img width="656" alt="스크린샷 2024-08-13 오후 5 56 47" src="https://github.com/user-attachments/assets/2f2f018d-34fd-4e09-b2bb-fca4e60b0326">

### 2. 게임화면
<img width="691" alt="스크린샷 2024-08-13 오후 5 57 16" src="https://github.com/user-attachments/assets/b3fdff56-8939-451c-90da-70ca4198edeb">

### 3. 게임종료 화면
<img width="521" alt="스크린샷 2024-08-13 오후 5 57 34" src="https://github.com/user-attachments/assets/5a231cf4-4d16-46e9-81bb-dd04edfce945">
