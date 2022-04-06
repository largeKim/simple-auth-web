#Change Log

## v0.1.0

- 프로젝트 생성
- README 초안작성
- CHANGELOG 생성

## v0.2.0
- validation utils 추가
- time util 추가

## v0.3.0
- feature
  - timer(hooks, boilerplate code)

## v0.3.1
- feature
  - components
    - TextInput atom 추가

## v0.3.2
- feature
  - components
    - NidInput(주민등록번호 입력) atom 추가

## v0.3.3
- feature
  - components
    - PrimaryButton atom 추가

## v0.3.4
- feature
  - components
    - Checkbox atom 추가

## v0.3.5
- feature
  - components
    - Article atom 추가

## v0.3.6
- feature
  - components
    - Timer atom 추가

## v0.4.0
- feature `유저 정보 입력로직 개선`
  - components
    - NidNumInput, TextInput atoms 수정
    - UserInfoSet molecules 추가
  - stores
    - user state 추가
  - hooks
    - useUserInfo 수정
  - utils
    - 핸드폰 검증 코드 추가
  - dependency
    - recoil 의존성 추가

## v0.4.1
- feature
  - lint 적용(eslint, prettier)

## v0.4.2
 - feature
   - api 추가(현재시간 가져오기,간편인증 요청+완료+가이드 리스트)
   - hooks
     - 화면 로직에 받게 수정
   - atom
     - PrivateOutlet(routing) 추가 `새로고침 시 만료메시지 출력`
 - dependency
   - unfetch 의존성 추가
 
## v0.5.0
  - feature
    - 결과페이지 구성(화면 및 api 구성)

## v1.0.0
  - merge develop into master

## v1.0.1
  - hotfix
    - 인증페이지 초기로드시 시간초과 되는부분 수정
    - unused import 제거
    - import 순서 변경
  - document
    - 개발분서 업데이트