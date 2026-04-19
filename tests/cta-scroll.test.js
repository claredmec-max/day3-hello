import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { attachLandingPageHandlers } from '../assets/main.js';

const testDir = dirname(fileURLToPath(import.meta.url));
const landingHtmlPath = resolve(testDir, '../index.html');

beforeEach(() => {
  const html = readFileSync(landingHtmlPath, 'utf-8');
  document.documentElement.innerHTML = html;
});

describe('CTA scroll to consult form', () => {
  it('CTA 클릭 시 상담 폼으로 부드럽게 스크롤하고 이름 입력으로 포커스 이동한다', () => {
    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#name');
    const cta = document.querySelector('[data-scroll-to-form]');

    const scrollIntoViewMock = vi.fn();
    form.scrollIntoView = scrollIntoViewMock;
    const focusSpy = vi.spyOn(nameInput, 'focus');

    attachLandingPageHandlers();
    cta.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('data-scroll-to-form 값이 비어있으면 기본값 #consult-form을 사용한다', () => {
    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#name');

    const cta = document.createElement('a');
    cta.setAttribute('href', '#consult-form');
    cta.setAttribute('data-scroll-to-form', '');
    document.body.appendChild(cta);

    const scrollIntoViewMock = vi.fn();
    form.scrollIntoView = scrollIntoViewMock;
    const focusSpy = vi.spyOn(nameInput, 'focus');

    attachLandingPageHandlers();
    cta.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('data-scroll-to-form selector가 잘못되어도 기본값 #consult-form으로 폴백한다', () => {
    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#name');

    const cta = document.createElement('a');
    cta.setAttribute('href', '#consult-form');
    cta.setAttribute('data-scroll-to-form', '[invalid-selector');
    document.body.appendChild(cta);

    const scrollIntoViewMock = vi.fn();
    form.scrollIntoView = scrollIntoViewMock;
    const focusSpy = vi.spyOn(nameInput, 'focus');

    attachLandingPageHandlers();

    expect(() => {
      cta.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }).not.toThrow();
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('form-feedback가 없어도 CTA 스크롤 바인딩은 동작한다', () => {
    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#name');
    const cta = document.querySelector('[data-scroll-to-form]');
    const feedback = document.querySelector('#form-feedback');

    feedback.remove();

    const scrollIntoViewMock = vi.fn();
    form.scrollIntoView = scrollIntoViewMock;
    const focusSpy = vi.spyOn(nameInput, 'focus');

    attachLandingPageHandlers();
    cta.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});
