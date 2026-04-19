# AI 코드 어시스턴스 교육 랜딩페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 비전공 입문자를 대상으로 상담 예약 전환율을 최대화하는 단일 랜딩페이지를 구현한다.

**Architecture:** 정적 HTML/CSS/Vanilla JS 구조로 구성하고, 폼 저장은 백엔드 연동 없이 모의 처리(mock submit)로 구현한다. 핵심 로직(검증/제출 핸들링/CTA 스크롤)을 JS 모듈로 분리해 테스트 가능하게 만들고, DOM 동작은 jsdom 기반 테스트로 검증한다.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript(ES Modules), Vitest, jsdom

---

## 파일 구조 및 책임 분해

- Modify: `index.html` — 랜딩 섹션 구조, CTA, 상담 폼 마크업
- Create: `assets/styles.css` — 랜딩 UI 스타일(가독성, CTA 강조, 모바일 대응)
- Create: `assets/main.js` — 폼 검증, 모의 제출, CTA 스크롤/포커스 처리
- Create: `package.json` — 테스트/개발 스크립트 및 의존성 정의
- Create: `vitest.config.js` — jsdom 테스트 환경 설정
- Create: `tests/setup.js` — 테스트 공통 초기화
- Create: `tests/landing-structure.test.js` — 랜딩 IA 구조 검증
- Create: `tests/form-validation.test.js` — 폼 입력 검증 로직 테스트
- Create: `tests/form-submit-ui.test.js` — 폼 제출 성공/실패 UI 동작 테스트
- Create: `tests/cta-scroll.test.js` — CTA 클릭 시 폼 이동/포커스 테스트

### Task 1: 테스트 러너 및 프로젝트 실행 환경 준비

**Files:**
- Create: `package.json`
- Create: `vitest.config.js`
- Create: `tests/setup.js`

- [ ] **Step 1: 실패하는 스모크 테스트 작성**

```js
// tests/landing-structure.test.js
import { describe, it, expect } from 'vitest';

describe('스모크', () => {
  it('테스트 러너가 실행된다', () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 2: 테스트 실행으로 실패 확인 (환경 미설치 상태)**

Run: `npm test`
Expected: FAIL with `npm ERR! missing script: test` 또는 `vitest: command not found`

- [ ] **Step 3: 최소 실행 환경 구현**

```json
{
  "name": "ai-code-assist-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "dev": "python3 -m http.server 4173"
  },
  "devDependencies": {
    "jsdom": "^26.1.0",
    "vitest": "^3.2.0"
  }
}
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js'
  }
});
```

```js
// tests/setup.js
import { afterEach } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});
```

- [ ] **Step 4: 테스트 재실행으로 통과 확인**

Run: `npm install && npm test`
Expected: PASS with `Test Files 1 passed`

- [ ] **Step 5: 커밋**

```bash
git add package.json vitest.config.js tests/setup.js tests/landing-structure.test.js
git commit -m "test: set up vitest and jsdom baseline"
```

### Task 2: 랜딩페이지 정보 구조(IA) 마크업 구현

**Files:**
- Modify: `index.html`
- Create: `assets/styles.css`
- Test: `tests/landing-structure.test.js`

- [ ] **Step 1: 실패하는 IA 구조 테스트 작성**

```js
// tests/landing-structure.test.js
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

function loadDocument() {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  return new JSDOM(html).window.document;
}

describe('랜딩 IA 구조', () => {
  it('핵심 섹션과 상담 폼을 포함한다', () => {
    const document = loadDocument();

    expect(document.querySelector('#hero')).not.toBeNull();
    expect(document.querySelector('#pain-points')).not.toBeNull();
    expect(document.querySelector('#solution')).not.toBeNull();
    expect(document.querySelector('#curriculum')).not.toBeNull();
    expect(document.querySelector('#trust')).not.toBeNull();
    expect(document.querySelector('#consulting')).not.toBeNull();
    expect(document.querySelector('#consult-form')).not.toBeNull();

    const ctas = document.querySelectorAll('[data-scroll-to-form]');
    expect(ctas.length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 2: 테스트 실행으로 실패 확인**

Run: `npm test -- tests/landing-structure.test.js`
Expected: FAIL with `expected null not to be null`

- [ ] **Step 3: 최소 IA 마크업과 스타일 구현**

```html
<!-- index.html -->
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI 코드 어시스턴스 교육 프로그램</title>
    <link rel="stylesheet" href="./assets/styles.css" />
  </head>
  <body>
    <header id="hero">
      <h1>비전공자도 AI 코드 어시스턴트로 개발 시작</h1>
      <p>막막한 입문 구간을 실전 루트로 연결합니다.</p>
      <button type="button" data-scroll-to-form>상담 예약하기</button>
    </header>

    <main>
      <section id="pain-points"><h2>입문자가 자주 막히는 지점</h2></section>
      <section id="solution"><h2>3단계 학습 방식</h2></section>
      <section id="curriculum"><h2>커리큘럼 요약</h2></section>
      <section id="trust"><h2>강사/후기/FAQ</h2></section>

      <section id="consulting">
        <h2>상담 예약</h2>
        <p>상담 후 결제가 진행됩니다.</p>
        <button type="button" data-scroll-to-form>지금 상담 예약</button>
        <form id="consult-form" novalidate>
          <label for="consult-name">이름</label>
          <input id="consult-name" name="name" type="text" />
          <label for="consult-phone">연락처</label>
          <input id="consult-phone" name="phone" type="tel" />
          <button type="submit">상담 요청 보내기</button>
          <p id="form-feedback" role="status" aria-live="polite"></p>
        </form>
      </section>
    </main>

    <footer>
      <button type="button" data-scroll-to-form>상담 예약하고 시작하기</button>
    </footer>

    <script type="module" src="./assets/main.js"></script>
  </body>
</html>
```

```css
/* assets/styles.css */
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; line-height: 1.5; color: #111827; }
header, section, footer { max-width: 960px; margin: 0 auto; padding: 48px 20px; }
header { padding-top: 64px; }
h1 { margin: 0 0 12px; font-size: 2rem; }
h2 { margin: 0 0 12px; font-size: 1.5rem; }
button { background: #2563eb; color: #fff; border: 0; border-radius: 8px; padding: 12px 18px; cursor: pointer; }
form { display: grid; gap: 10px; margin-top: 16px; max-width: 420px; }
input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; }
#form-feedback { min-height: 24px; margin: 0; }
@media (max-width: 640px) {
  header, section, footer { padding: 32px 16px; }
  h1 { font-size: 1.6rem; }
}
```

- [ ] **Step 4: IA 테스트 통과 확인**

Run: `npm test -- tests/landing-structure.test.js`
Expected: PASS with `1 passed`

- [ ] **Step 5: 커밋**

```bash
git add index.html assets/styles.css tests/landing-structure.test.js
git commit -m "feat: add single-page landing structure and core sections"
```

### Task 3: 폼 입력 검증 로직 구현

**Files:**
- Create: `assets/main.js`
- Test: `tests/form-validation.test.js`

- [ ] **Step 1: 실패하는 검증 테스트 작성**

```js
// tests/form-validation.test.js
import { describe, it, expect } from 'vitest';
import { validateConsultForm } from '../assets/main.js';

describe('상담 폼 검증', () => {
  it('이름이 비어 있으면 실패한다', () => {
    const result = validateConsultForm({ name: '', phone: '01012345678' });
    expect(result).toEqual({ valid: false, error: 'name_required' });
  });

  it('연락처 형식이 유효하지 않으면 실패한다', () => {
    const result = validateConsultForm({ name: '홍길동', phone: '010-12' });
    expect(result).toEqual({ valid: false, error: 'phone_invalid' });
  });

  it('이름과 연락처가 유효하면 성공한다', () => {
    const result = validateConsultForm({ name: '홍길동', phone: '010-1234-5678' });
    expect(result).toEqual({ valid: true, error: null });
  });
});
```

- [ ] **Step 2: 테스트 실행으로 실패 확인**

Run: `npm test -- tests/form-validation.test.js`
Expected: FAIL with `Failed to resolve import "../assets/main.js"` 또는 `validateConsultForm is not exported`

- [ ] **Step 3: 최소 검증 로직 구현**

```js
// assets/main.js
export function validateConsultForm({ name, phone }) {
  const safeName = (name ?? '').trim();
  const safePhone = (phone ?? '').replace(/[^0-9]/g, '');

  if (!safeName) {
    return { valid: false, error: 'name_required' };
  }

  if (safePhone.length < 10 || safePhone.length > 11) {
    return { valid: false, error: 'phone_invalid' };
  }

  return { valid: true, error: null };
}

export function attachLandingPageHandlers() {}
```

- [ ] **Step 4: 검증 테스트 통과 확인**

Run: `npm test -- tests/form-validation.test.js`
Expected: PASS with `3 passed`

- [ ] **Step 5: 커밋**

```bash
git add assets/main.js tests/form-validation.test.js
git commit -m "feat: add minimal consult form validation"
```

### Task 4: 폼 제출 모의 처리 및 피드백 UI 구현

**Files:**
- Modify: `assets/main.js`
- Modify: `index.html`
- Test: `tests/form-submit-ui.test.js`

- [ ] **Step 1: 실패하는 제출 UI 테스트 작성**

```js
// tests/form-submit-ui.test.js
import { readFileSync } from 'node:fs';
import { describe, it, expect, vi } from 'vitest';
import { attachLandingPageHandlers } from '../assets/main.js';

function mountDom() {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  document.documentElement.innerHTML = html;
}

describe('상담 폼 제출 UI', () => {
  it('제출 성공 시 성공 메시지를 노출하고 폼을 초기화한다', async () => {
    mountDom();
    const submitLead = vi.fn().mockResolvedValue({ ok: true });
    attachLandingPageHandlers({ submitLead });

    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#consult-name');
    const phoneInput = document.querySelector('#consult-phone');
    const feedback = document.querySelector('#form-feedback');

    nameInput.value = '홍길동';
    phoneInput.value = '010-1234-5678';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await Promise.resolve();

    expect(submitLead).toHaveBeenCalledWith({ name: '홍길동', phone: '010-1234-5678' });
    expect(feedback.textContent).toContain('상담 요청이 접수되었습니다');
    expect(nameInput.value).toBe('');
    expect(phoneInput.value).toBe('');
  });

  it('제출 실패 시 오류 메시지를 노출한다', async () => {
    mountDom();
    const submitLead = vi.fn().mockRejectedValue(new Error('network down'));
    attachLandingPageHandlers({ submitLead });

    const form = document.querySelector('#consult-form');
    document.querySelector('#consult-name').value = '홍길동';
    document.querySelector('#consult-phone').value = '01012345678';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await Promise.resolve();

    expect(document.querySelector('#form-feedback').textContent).toContain('요청 전송에 실패했습니다');
  });
});
```

- [ ] **Step 2: 테스트 실행으로 실패 확인**

Run: `npm test -- tests/form-submit-ui.test.js`
Expected: FAIL with `attachLandingPageHandlers(...) is not handling submit`

- [ ] **Step 3: 제출 핸들링 최소 구현**

```js
// assets/main.js
export function validateConsultForm({ name, phone }) {
  const safeName = (name ?? '').trim();
  const safePhone = (phone ?? '').replace(/[^0-9]/g, '');

  if (!safeName) return { valid: false, error: 'name_required' };
  if (safePhone.length < 10 || safePhone.length > 11) return { valid: false, error: 'phone_invalid' };
  return { valid: true, error: null };
}

export async function submitLeadMock() {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return { ok: true };
}

function getErrorMessage(code) {
  if (code === 'name_required') return '이름을 입력해주세요.';
  if (code === 'phone_invalid') return '연락처 형식을 확인해주세요.';
  return '입력값을 확인해주세요.';
}

export function attachLandingPageHandlers({ submitLead = submitLeadMock } = {}) {
  const form = document.querySelector('#consult-form');
  const feedback = document.querySelector('#form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    const validation = validateConsultForm({ name, phone });

    if (!validation.valid) {
      feedback.textContent = getErrorMessage(validation.error);
      return;
    }

    try {
      await submitLead({ name, phone });
      form.reset();
      feedback.textContent = '상담 요청이 접수되었습니다. 24시간 내 연락드릴게요.';
    } catch {
      feedback.textContent = '요청 전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => attachLandingPageHandlers());
} else {
  attachLandingPageHandlers();
}
```

```html
<!-- index.html 내 폼 영역 일부 확인: name/phone/form-feedback id 및 name 속성 유지 -->
<form id="consult-form" novalidate>
  <label for="consult-name">이름</label>
  <input id="consult-name" name="name" type="text" autocomplete="name" />

  <label for="consult-phone">연락처</label>
  <input id="consult-phone" name="phone" type="tel" autocomplete="tel" />

  <button type="submit">상담 요청 보내기</button>
  <p id="form-feedback" role="status" aria-live="polite"></p>
</form>
```

- [ ] **Step 4: 제출 UI 테스트 통과 확인**

Run: `npm test -- tests/form-submit-ui.test.js`
Expected: PASS with `2 passed`

- [ ] **Step 5: 커밋**

```bash
git add assets/main.js index.html tests/form-submit-ui.test.js
git commit -m "feat: add mock consult submission flow and feedback messages"
```

### Task 5: CTA 스크롤 이동 및 접근성 포커스 처리 구현

**Files:**
- Modify: `assets/main.js`
- Modify: `index.html`
- Test: `tests/cta-scroll.test.js`

- [ ] **Step 1: 실패하는 CTA 스크롤 테스트 작성**

```js
// tests/cta-scroll.test.js
import { readFileSync } from 'node:fs';
import { describe, it, expect, vi } from 'vitest';
import { attachLandingPageHandlers } from '../assets/main.js';

function mountDom() {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  document.documentElement.innerHTML = html;
}

describe('CTA 스크롤 동작', () => {
  it('CTA 클릭 시 상담 폼으로 스크롤하고 이름 입력으로 포커스 이동한다', () => {
    mountDom();

    const form = document.querySelector('#consult-form');
    form.scrollIntoView = vi.fn();

    attachLandingPageHandlers({ submitLead: vi.fn() });

    const cta = document.querySelector('[data-scroll-to-form]');
    const nameInput = document.querySelector('#consult-name');
    cta.click();

    expect(form.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(document.activeElement).toBe(nameInput);
  });
});
```

- [ ] **Step 2: 테스트 실행으로 실패 확인**

Run: `npm test -- tests/cta-scroll.test.js`
Expected: FAIL with `expected "spy" to be called`

- [ ] **Step 3: CTA 스크롤/포커스 로직 최소 구현**

```js
// assets/main.js (attachLandingPageHandlers 내부에 추가)
function wireCtasToForm(form, nameInput) {
  const ctas = document.querySelectorAll('[data-scroll-to-form]');

  ctas.forEach((cta) => {
    cta.addEventListener('click', (event) => {
      event.preventDefault();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nameInput.focus();
    });
  });
}

export function attachLandingPageHandlers({ submitLead = submitLeadMock } = {}) {
  const form = document.querySelector('#consult-form');
  const feedback = document.querySelector('#form-feedback');
  const nameInput = document.querySelector('#consult-name');

  if (!form || !feedback || !nameInput) return;

  wireCtasToForm(form, nameInput);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    const validation = validateConsultForm({ name, phone });

    if (!validation.valid) {
      feedback.textContent = getErrorMessage(validation.error);
      return;
    }

    try {
      await submitLead({ name, phone });
      form.reset();
      feedback.textContent = '상담 요청이 접수되었습니다. 24시간 내 연락드릴게요.';
    } catch {
      feedback.textContent = '요청 전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
    }
  });
}
```

```html
<!-- index.html: 모든 주요 CTA에 data-scroll-to-form 속성 유지 -->
<button type="button" data-scroll-to-form>상담 예약하기</button>
<button type="button" data-scroll-to-form>지금 상담 예약</button>
<button type="button" data-scroll-to-form>상담 예약하고 시작하기</button>
```

- [ ] **Step 4: CTA 스크롤 테스트 통과 확인**

Run: `npm test -- tests/cta-scroll.test.js`
Expected: PASS with `1 passed`

- [ ] **Step 5: 커밋**

```bash
git add assets/main.js index.html tests/cta-scroll.test.js
git commit -m "feat: wire CTA buttons to consult form scroll and focus"
```

### Task 6: 전체 검증 및 수동 골든패스 확인

**Files:**
- Modify: `index.html` (필요 시 문구 미세 조정)
- Modify: `assets/styles.css` (필요 시 반응형 간격 조정)

- [ ] **Step 1: 전체 자동 테스트 실행**

Run: `npm test`
Expected: PASS with `Test Files 4 passed`

- [ ] **Step 2: 로컬 서버 실행 및 수동 검증**

Run: `npm run dev`
Expected: server running at `http://localhost:4173`

수동 검증 체크리스트:
- 히어로/문제/해결/커리큘럼/신뢰/상담 섹션 순서 확인
- 모든 CTA 클릭 시 상담 폼으로 이동하는지 확인
- 이름/연락처 입력 후 제출 시 성공 메시지 확인
- 빈 이름/잘못된 연락처 제출 시 오류 메시지 확인
- 모바일 너비(375px)에서 CTA와 폼 가독성 확인

- [ ] **Step 3: 필요한 최소 수정 반영**

```css
/* assets/styles.css 조정 예시 */
#consulting { scroll-margin-top: 24px; }
@media (max-width: 640px) {
  button { width: 100%; }
}
```

- [ ] **Step 4: 회귀 테스트 재실행**

Run: `npm test`
Expected: PASS with `Test Files 4 passed`

- [ ] **Step 5: 최종 커밋**

```bash
git add index.html assets/styles.css assets/main.js tests/*.test.js
git commit -m "feat: complete high-conversion single-page landing with mock consult flow"
```

## 셀프 리뷰 결과

- Spec coverage: 단일 랜딩 구조, 비전공 타깃 메시지, 이름+연락처 최소 폼, 상담 후 결제 문구, 제출 성공/실패 처리, 접근성, 모바일 검증까지 모든 요구사항이 Task 2~6에 매핑됨.
- Placeholder scan: `TBD`, `TODO`, 모호한 문구 없이 각 코드/명령/기대결과를 명시함.
- Type consistency: `validateConsultForm`, `attachLandingPageHandlers`, `submitLeadMock`, `name/phone` 시그니처를 전 태스크에서 일관되게 사용함.
