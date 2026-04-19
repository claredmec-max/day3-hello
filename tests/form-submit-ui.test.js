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

describe('consult form submit UI', () => {
  it('성공 시 submitLead를 호출하고 성공 메시지를 노출하며 폼을 reset한다', async () => {
    const submitLead = vi.fn().mockResolvedValue({ ok: true });
    attachLandingPageHandlers({ submitLead });

    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#name');
    const phoneInput = document.querySelector('#phone');
    const messageInput = document.querySelector('#message');
    const feedback = document.querySelector('#form-feedback');

    nameInput.value = '홍길동';
    phoneInput.value = '010-1234-5678';
    messageInput.value = '상담 희망';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await vi.waitFor(() => {
      expect(submitLead).toHaveBeenCalledTimes(1);
      expect(feedback.textContent).toContain('상담 요청이 접수되었습니다');
      expect(nameInput.value).toBe('');
      expect(phoneInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });

    expect(submitLead).toHaveBeenCalledWith({
      name: '홍길동',
      phone: '010-1234-5678',
      message: '상담 희망'
    });
  });

  it('submitLead가 { ok: false }를 반환하면 오류 메시지를 노출한다', async () => {
    const submitLead = vi.fn().mockResolvedValue({ ok: false });
    attachLandingPageHandlers({ submitLead });

    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#name');
    const phoneInput = document.querySelector('#phone');
    const feedback = document.querySelector('#form-feedback');

    nameInput.value = '홍길동';
    phoneInput.value = '010-1234-5678';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await vi.waitFor(() => {
      expect(submitLead).toHaveBeenCalledTimes(1);
      expect(feedback.textContent).toContain('요청 처리 중 문제가 발생했습니다');
    });
  });

  it('attachLandingPageHandlers를 중복 호출해도 submit 리스너는 한 번만 동작한다', async () => {
    const submitLead = vi.fn().mockResolvedValue({ ok: true });

    attachLandingPageHandlers({ submitLead });
    attachLandingPageHandlers({ submitLead });

    const form = document.querySelector('#consult-form');
    const nameInput = document.querySelector('#name');
    const phoneInput = document.querySelector('#phone');

    nameInput.value = '홍길동';
    phoneInput.value = '010-1234-5678';

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await vi.waitFor(() => {
      expect(submitLead).toHaveBeenCalledTimes(1);
    });
  });
});
