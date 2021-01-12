# withWecode

<br/>

## Git 관리 규칙

해당 Repository의 Git은 다음과 같이 관리합니다.

<br/>

#### 1. branch

- branch는 다음과 같은 계층 구조로 관리합니다. <br/>

  *개인적으로 연습하고 싶으면, 본인 영어호칭으로 브랜치를 생성할 것을 권장합니다!!*

  ```
  main
  └ develop
    └ front-end
      └ feature/foo
        ...
    └ back-end
      └ feature/bar
        ...
  ```

  > **관련 명령어**
  >
  > 1. 확인
  >
  >    - 로컬 브랜치 확인
  >
  >      `git branch`
  >
  >    - 원격 브랜치 확인
  >
  >      `git branch -r`
  >
  >      `git remote show origin`
  >
  >    - 로컬, 원격 둘다 확인
  >
  >      `git branch -a`
  >
  > 2. 생성
  >
  >    - 로컬 브랜치 생성
  >
  >      `git checkout -b [브랜치 이름]`
  >
  >    - 로컬에서 원격 브랜치 생성
  >
  >      `git push origin [브랜치 이름]`
  >
  > 3. 삭제
  >
  >    - 로컬 브랜치 삭제
  >
  >      `git branch -d [브랜치 이름]`
  >
  >      `git branch -D [브랜치 이름]` (commit에 상관없이 강력 삭제)
  >
  >    - 원격 브랜치 삭제
  >
  >      `git push origin :[브랜치 이름]`
  >
  > 4. 전환
  >
  >    - 로컬 브랜치 전환
  >
  >      `git chekcout [브랜치 이름]`
  >
  > 5. 연동
  >
  >    - 로컬, 원격 브랜치 연동
  >
  >      `git branch --set-upstream-to origin/[브랜치 이름]`
  >
  > 6. 원격 브랜치를 그대로 로컬로 가져오는 법
  >
  >    - 먼저 원격 브랜치에 접근하기 위해 갱신
  >
  >      `git remote update`
  >
  >      이후 가져오기
  >
  >      `git checkout -t origin/[브랜치 이름]`
  >
  > 

<br/>

<br/>

#### 2. commit

- **커밋 제목은 짧은 구문**으로 작성하기!

```shell
git commit -m '[월일] | [개발자 이름] | [커밋 내용]'

`ex)` 
git commit -m '0108 | Sinbad | 로그인 기능 구현'
```

- 상세한 설명이 필요한 경우 내용까지 작성!

<br/>

<br/>

#### 3. push

- **항상 브랜치 명을 써줍시다!!!!!!!!!!!!!!**

  ```
  git push origin [브랜치 이름]
  
  git push //이러면 절대 안됨!!! 따로 설정하지 않는 이상 default 브랜치로 푸쉬가 됨
  ```

<br/>

<br/>

#### 4. merge

- merge는 git bash로 하면 무서우니까 **github로 리퀘스트**를 보낼 것!
  - develop 브랜치 머지 - 신밧드가 확인
  - front-end 브랜치 머지 - 신밧드가 확인
  - back-end 브랜치 머지 - 라일라가 확인

<br/>

<br/>

#### 5. 꿀팁!!!!!!!!!!

- `git reset`

  - https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html

  - 추후 정리할게요...

    