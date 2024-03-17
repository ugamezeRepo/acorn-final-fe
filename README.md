# 에이콘 2조 프로젝트 - 도토리 프론트엔드입니다

##  :tv: 프로젝트 소개
Springboot & React 를 활용한 메신저 사이트

배포 주소 : https://dotori.site

## :alarm_clock: 개발기간

* 2024.02.12 ~ 2024.03.15

## 🔧 개발 환경

- **Language** : `Java`, `Javascript`
- **IDE**  : `IntelliJ`, `VisualStudioCode`
- **Framework** : `SpringBoot` , `React`
- **DataBase** : `Oracle Database 11g`
- **SQL Mapper** : `Mybatis`

## ⭐️ 주요 기능

- 웹 소켓을 활용한 채팅기능
- Oauth2 인증을 이용한 로그인 및 가입 구현
- 온/오프라인 회원 정보 관리
- 서버 유저별 권한 관리
- 초대코드를 통한 입장구현
- Jwt 을 활용한 AccessToken 발급(쿠키)
- Refresh 토큰 발급 및 관리(DB, 쿠키)
- Security를 활용한 토큰 유효성 검사
- 메세지 수정 및 삭제 기능 구현
- 서버 및 채널 생성 및 삭제 기능 구현
- 이모지 API 활용
- 채팅 파일 업로드 구현
- Swagger 이용한 API 공유


## 세팅

다음은 VSC의 settings.json 설정 정보입니다
```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit"
    },
    "editor.formatOnSave": true,
}
```

다음은 설치를 권장하는 VSC 플러그인 목록들입니다
- [ESLint](vscode:extension/dbaeumer.vscode-eslint), 없으면 fixAll 이 안될수도 있음
- [vscode-styled-components](vscode:extension/styled-components.vscode-styled-components), 없으면 styled components backtick으로 함수 호출할때 intellisense 의 도움을 받지 못함
- [Color Highlight](vscode:extension/naumovs.color-highlight) css in js 할때 많이 도움 됨


추가로 eslint 규칙 잘 지켜주세요  
안지키면 push 및 merge 가 안됩니다   
감사합니다  
