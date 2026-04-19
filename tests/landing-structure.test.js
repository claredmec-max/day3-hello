import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const landingHtmlPath = resolve(process.cwd(), 'index.html');

beforeEach(() => {
  const html = readFileSync(landingHtmlPath, 'utf-8');
  document.documentElement.innerHTML = html;
});

describe('랜딩 IA 구조', () => {
  it('메인 모듈 스크립트를 로드한다', () => {
    const mainScript = document.querySelector('script[type="module"][src="./assets/main.js"]');
    expect(mainScript).not.toBeNull();
  });

  it('필수 섹션 id가 모두 존재한다', () => {
    const requiredIds = [
      'hero',
      'pain-points',
      'solution',
      'curriculum',
      'trust',
      'consulting',
      'consult-form'
    ];

    requiredIds.forEach((id) => {
      expect(document.querySelector(`#${id}`)).not.toBeNull();
    });
  });

  it('상담 폼으로 이동하는 CTA가 최소 3개 존재한다', () => {
    const ctas = document.querySelectorAll('[data-scroll-to-form]');

    expect(ctas.length).toBeGreaterThanOrEqual(3);

    ctas.forEach((cta) => {
      const target = cta.getAttribute('data-scroll-to-form');
      expect(target === '' || target === '#consult-form').toBe(true);
    });
  });
});
