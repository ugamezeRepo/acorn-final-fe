# 에이콘 2조 프로젝트 - 프론트엔드입니다

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