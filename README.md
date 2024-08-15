타로:봄

## 📚 목차

- [🗓️프로젝트 개요](#️프로젝트-개요)
  - [진행 기간](#진행-기간)
  - [기획 배경]()

- [개발 환경]()
  - [프로젝트 파일 구조]()

- [👯‍♀️팀원 정보 및 업무 분담](#️팀원-정보-및-업무-분담)

- [📢서비스 소개](#서비스-소개)
  - [타로:봄](#서비스-기획-목표)
  - [ERD](#erd)
  - [와이어프레임](#wireframe)
  - [아키텍쳐]()
  - [핵심 기술]()

- [💻구현 기능]()

- [👍 느낀 점](#-느낀-점)



<hr>

## 🗓️프로젝트 개요

### 진행 기간
2024.07.02 ~ 2024.08.16(7주)

### 기획 배경
- 타로를 봐보고 싶지만 가볍게 시작해보기는 생각보다 어렵다.
- 사람 대 사람 타로 넘어가는 부분이 특히 어려움. 사람 대 사람 타로는 비싼 돈을 내야하는 전문가에 의한 타로가 대부분이기 때문. 또, 타로를 직접 보고자 하더라도 같은 관심사를 가진 사람을 만나기가 어렵다.
- 이런 타로의 단계별 진입장벽을 자연스럽게 해결할 수 있는 서비스를 만들자! 우리의 목표는 타로의 대중화! 하고 기획하게 된 것이 타로봄!

##  개발 환경

#### Backend
- Spring
- MySQL
- Redis

#### Frontend
- React
- Node.js
- Tailwind CSS
- Justand

#### CI/CD
- Git
- Jira
- Notion

#### 프로젝트 파일 구조


#### Frontend
```
📦src
 ┣ 📂assets
 ┃ ┣ 📜arrow-left-circle.svg
 ┃ ┣ 📜box-arrow-in-right.svg
 ┃ ┣ 📜caret-down-square.svg
 ┃ ┣ 📜coin.svg
 ┃ ┣ 📜disneyplus.svg
 ┃ ┣ 📜main-img.png
 ┃ ┣ 📜movie-repeat.svg
 ┃ ┣ 📜netflix.svg
 ┃ ┣ 📜person-add.svg
 ┃ ┣ 📜recommend-rewrite.svg
 ┃ ┗ 📜watcha.svg
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜MovieNavbar.vue
 ┃ ┃ ┗ 📜OTTNavbar.vue
 ┃ ┣ 📂movies
 ┃ ┃ ┣ 📜MovieCard.vue
 ┃ ┃ ┣ 📜MovieDetailInfo.vue
 ┃ ┃ ┣ 📜MovieRecommend.vue
 ┃ ┃ ┗ 📜Recommend.vue
 ┃ ┗ 📂otts
 ┃ ┃ ┣ 📜MyPartyCard.vue
 ┃ ┃ ┣ 📜MyPartyCreated.vue
 ┃ ┃ ┣ 📜MyPartyJoined.vue
 ┃ ┃ ┗ 📜PartyCard.vue
 ┣ 📂router
 ┃ ┗ 📜index.js
 ┣ 📂stores
 ┃ ┗ 📜movie.js
 ┣ 📂views
 ┃ ┣ 📜AIRecommendView.vue
 ┃ ┣ 📜HomeView.vue
 ┃ ┣ 📜LoginView.vue
 ┃ ┣ 📜MovieDetailView.vue
 ┃ ┣ 📜MyPageView.vue
 ┃ ┣ 📜OTTHomeView.vue
 ┃ ┣ 📜PartyCreateView.vue
 ┃ ┣ 📜PartyJoinView.vue
 ┃ ┗ 📜SignupView.vue
 ┣ 📜App.vue
 ┗ 📜main.js

```

## 팀 소개
![alt text](<assets/팀 소개.PNG>)


<br></br>

## 서비스 소개

### 타로:봄
- 타로:봄 – 타로점을 보고싶은 사람, 시커(seeker)와 타로점을 봐 주는 사람, 리더(reader) 모두가 쉽게 타로를 즐길 수 있는 통합 타로 플랫폼
- 시커는? -> 랜덤매칭을 통해 가벼운 타로점 보기 가능, 예약을 통해 원하는 사람과 타로를 보는 것도 가능.
- 리더는? -> 누구나 리더 프로필 생성을 통해 리더가 될 수 있음, 랜덤매칭을 통해 가볍게 타로점 봐 주기 가능,예약을 받아 약속된 때에 리딩을 하는 것도 가능.
- 커뮤니티를 통해 교류 가능,  오프라인 타로점까지의 연결

### ERD
![alt text](assets/ERD.png)

### 와이어프레임
![alt text](assets/Figma.png)

### 아키텍쳐
![alt text](assets/아키텍처.PNG)

### 핵심 기술




## 구현 기능
<table>
  <thead>
    <tr>
      <th>메인 페이지</th>
      <th>취향 설문</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="assets/MainPage.gif" width="400px"></td>
      <td></td>
      <td><img src="https://github.com/MINJOO-KIM/Movie/assets/124031561/ef4b8baa-c741-4e5e-964e-d58bf54df9cd.gif" 
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>취향 기반 영화 추천</th>
      <th>영화 상세 조회</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="assets\survery-recommend.gif" width="400px"></td>
      <td><img src="assets\movie-detail.gif" width="400px"></td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>회원가입</th>
      <th>로그인/로그아웃</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="assets\signup.gif" width="400px"></td>
      <td><img src="assets\login-logout.gif" width="400px"></td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>계정 공유 파티 개설</th>
      <th>계정 공유 파티 조회</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="assets\party-create.gif" width="400px"></td>
      <td><img src="assets\party-search.gif" width="400px"></td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>계정 공유 파티 참여</th>
      <th>마이 페이지</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="assets\party-participate.gif" width="400px"></td>
      <td><img src="assets\my-page.gif" width="400px"></td>
    </tr>
  </tbody>
  <thead>
    <tr>
      <th>계정 공유 파티 수정</th>
      <th>계정 공유 파티 탈퇴</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="assets\party-update.gif" width="400px"></td>
      <td><img src="assets\party-leave.gif" width="400px"></td>
    </tr>
  </tbody>
</table>

![alt text](assets/mainpage.webm)
## 느낀 점
