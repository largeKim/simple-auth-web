# 간편 인증 페이지

## 1. 프로젝트 설명 및 구조
### 1-1. 설명
- 기본 개발환경
> OS: `macOS 12.1`
>
> yarn `v1.23.0`
>
> cra `create-react-app` wrapped by `craco`
> 
> react `v17`
> 
> webpack `v5`
> 
> babel `v7`
> 
> jest `v27`

### 1-2. 구조
```shell
├── __tests__       # 테스트 cases (하위 폴더링은 src 구조에 따름)
├── public
└── src
    └── apis        # api 호출관련 모음
    └── assets      # 이미지 및 아이콘 모음(구분은 figma 명명규칙에 따름)
    └── components  # page에 조합될 components들
    └── hooks       # custom hook 모음
    └── pages       # rounting
    └── stores      # 횡단 상태 관심사(recoil) 모음 
    └── utils       # util 모음
```

## 2.로컬 환경 프로젝트 실행방법
```shell
$ yarn start
```

## 3.로컬 환경 테스트 실행 방법
테스트는 `craco` 내부에서 기본설정값 + 추가 설정값으로 `jest`를 실행합니다.
```shell
$ yarn test
```
