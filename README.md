# net-hbkr-api-system

HBKR **API**의 GitHub Pages용 독립 prototype 저장소입니다.

- Production review URL: https://api.hbkr.net/
- Repository type: `system`
- Current implementation: static interactive prototype
- Backend, database, authentication, payment, live API: not connected

## Product boundary

Layer, Role, Capability, Evidence와 Talent-Project Matching 데이터 계약을 탐색하는 API 프로토타입.

화면의 인물, 프로젝트, 상태와 수치는 정보 구조 검토용 sample이며 실제 운영 사실을 의미하지 않습니다.

## Local preview

```bash
npm run check
npm run dev
```

## Deployment

`main`에 push하면 GitHub Actions가 GitHub Pages로 배포합니다. Custom domain은 `api.hbkr.net`입니다.
