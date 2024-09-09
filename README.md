# SNS 공유 플랫폼

<!--배지-->
![Repository Size][repository-size-shield] ![Issue open][issue-open-shield] ![Issue Closed][issue-closed-shield] ![Issue PR][issue-PR-shield] ![Issue PRClosed][issue-PRclosed-shield]

<!--프로젝트 대문 이미지-->
![프로젝트 목업](https://github.com/user-attachments/assets/24ec2279-366e-42b7-a2d7-4ba5b14dbc9d)

### <a href="https://toy-project-3.web.app/" target="_blank">프로젝트 사이트</a>
#### ID: `test1@gmail.com` PW: `123123`
<!--목차-->
# 목차
- [📚 프로젝트 설명](#-프로젝트-설명)
  - [📌 주요 기능](#-주요-기능)
  - [프로젝트 목적](#프로젝트-목적)
  - [🛠️ Tech Stack](#️-tech-stack)
- [📷 프로젝트 예시](#-프로젝트-예시)
- [⚙️ 시작하기](#️-시작하기)
  - [사전 준비사항](#사전-준비사항)
  - [설치](#설치)
  - [구성](#구성)

# 📚 프로젝트 설명

이 프로젝트는 사용자들이 영상과 노래를 공유할 수 있는 플랫폼입니다. 간편한 UI와 상호작용 기능을 통해, 사용자들이 자신만의 플레이리스트를 다른 사람들과 쉽게 공유하고 즐길 수 있는 환경을 제공합니다. 공유된 콘텐츠에 대한 피드백과 소통을 통해 사용자들 간의 활발한 상호작용이 가능합니다.

## 📌 주요 기능
1. 플레이리스트 생성 및 공유: 사용자들은 자신만의 플레이리스트를 만들고, 다른 사용자들과 손쉽게 공유할 수 있습니다.
2. 상호작용 기능: 좋아요, 댓글 등을 통해 사용자 간의 소통이 가능합니다.
3. 다양한 콘텐츠 지원: 영상과 노래 모두를 지원하여 다양한 형태의 콘텐츠를 하나의 플랫폼에서 즐길 수 있습니다.

## 프로젝트 목적

1. 간편한 공유 기능: 사용자는 복잡한 절차 없이 자신이 좋아하는 영상이나 노래를 리스트로 만들어 다른 사람들과 즉시 공유할 수 있습니다.

2. 사용자 친화적인 인터페이스: 직관적이고 깔끔한 UI를 통해 누구나 쉽게 이용할 수 있는 플랫폼을 지향합니다. 사용자 경험을 최우선으로 고려하여 최소한의 클릭으로 다양한 기능을 사용할 수 있습니다.

3. 커뮤니티 기반의 상호작용: 사용자들이 서로의 플레이리스트에 댓글을 남기거나, 좋아요를 눌러 소통할 수 있어 보다 친밀한 커뮤니티 형성이 가능합니다.

## 🛠️ Tech Stack

### 🧑‍💻 Front-End 🧑‍💻

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tanstack Query](https://img.shields.io/badge/Tanstack%20Query-FF4154?style=for-the-badge&logo=TanstackQuery&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white)

![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

### 🧑‍💻 Back-End 🧑‍💻

![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

### 💻 기타 💻

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

# 📷 프로젝트 예시

## 🔎 [사용자 페이지]

| 사용자 홈 | 상세페이지 |
|:-:|:-:|
|![사용자 홈](https://github.com/user-attachments/assets/1ea9ba2c-2494-499a-8ac0-848c447bfbe1)|![상세페이지](https://github.com/user-attachments/assets/1c29f02e-a0f7-45e8-8a57-2bb3c8abed8a)

---

# ⚙️ 시작하기

## 사전 준비사항

- [Firebase](https://firebase.google.com/?hl=ko)
- pnpm

```bash
npm install -g pnpm
```

## 설치

1. Repository 클론

```bash
https://github.com/sbs1253/toy-project-3-solo.git
```

2. packages 설치

```bash
pnpm i
```

## 구성

- `firevase.js`에 있는 Config파일에 [firebase](https://firebase.google.com/?hl=ko)에 있는 SDK 입력

```bash
예시
const firebaseConfig = {
  apiKey: 
  authDomain:
  databaseURL: 
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
}
```

- DB에 저장된 데이터 형식에 맞게 변환 후 사용

<!--Url for Badges-->
[repository-size-shield]: https://img.shields.io/github/repo-size/sbs1253/toy-project-3-solo
[issue-open-shield]: https://img.shields.io/github/issues/sbs1253/toy-project-3-solo?color=abcdef
[issue-closed-shield]: https://img.shields.io/github/issues-closed/sbs1253/toy-project-3-solo?color=4ec920
[issue-PR-shield]: https://img.shields.io/github/issues-pr/sbs1253/toy-project-3-solo?color=abcdef
[issue-PRclosed-shield]: https://img.shields.io/github/issues-pr-closed/sbs1253/toy-project-3-solo?color=4ec920

<!--Url for Buttons
[readme-eng-shield]: 
[view-demo-shield]:
[view-demo-url]: 
[report-bug-shield]:
[report-bug-url]:
[request-feature-shield]:
[request-feature-url]:
-->

<!--URLS-->
