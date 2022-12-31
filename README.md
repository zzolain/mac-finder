# MacOS Finder 앱 클론

## 개요

MacOS의 Finder 앱 클론

## 목적

- Composite pattern에 대한 이해
- 사용자 Drag 인터렉션 구현
- TypeScript 런타임 객체 유효성 검증 라이브러리 Zod 사용 경험
- Frontend 빌드 도구 Vite 사용 경험
- React 상태 관리 라이브러리 Zustand 사용 경험

## 주요 기능

- 폴더와 파일 정보가 저장된 `JSON` 파일을 읽어 파인더에 출력한다.
- `JSON` 파일 형식은 아래 형식을 따른다.
  - { <폴더구조> : <파일내용> }
  - 폴더구조
    - 타입 - `string`
    - `"outer.inner.inner-inner.file_name"`와 같이 `.`를 단위로 폴더 이름 구분
    - 마지막 단위는 파일 이름이 된다.
    - 입력 가능 문자 - 알파벳, 숫자, 특수문자 `.-_`
  - 파일내용
    - 타입 - `string`
- `JSON`이 아닌 파일은 import 할 수 없으며, import한 파일의 형식이 올바르지 않을 경우 관련 에러를 출력한다.
- 폴더 또는 파일은 클릭 또는 키보드 방향키로 선택할 수 있다.
- 폴더를 선택하면 해당 폴더의 하위 폴더 및 파일을 우측에 출력한다.
- 파일을 선택하면 해당 파일의 내용을 우측에 출력한다.
- 파일 또는 폴더를 검색할 수 있다.
- 검색한 파일 또는 폴더로 이동할 수 있다.

## 미리보기

![preview](/public/readme/preview.gif)

## 실행방법

```bash
npm install
npm run dev
```

## 기술스택

- UI
  - [React](https://reactjs.org/)
  - [Styled-components](https://styled-components.com/)
- Type Management
  - [TypeScript](https://www.typescriptlang.org/)
  - [Zod](https://github.com/colinhacks/zod)
- State Management
  - [Zustand](https://github.com/pmndrs/zustand)
- Build Tool
  - [Vite](https://vitejs.dev/)
- Test
  - [Vitest](https://vitest.dev/)
  - [React Testing Library](https://testing-library.com/)

## 설계

![MacFinder@2x.png](/public/readme/macFinder.png)

## 참고

- Composite pattern
  - 객체를 트리 구조로 구성해서 부분-전체 관계의 계층 구조를 구현
  - 부분-전체 관계의 대표적인 예로는 `파일-디렉토리` 관계가 있음
  - 클라이언트에서 개별 객체와 복합 객체를 똑같은 방법으로 다를 수 있음.
    즉, 복합 객체와 개별 객체를 구분할 필요가 거의 없어짐
  - 자식 원소가 있는 원소를 `Node`, 자식 원소가 없는 원소를 `Leaf`라고 함
    ![Diagram of Composite Pattern](/public/readme/composite-pattern.png)
