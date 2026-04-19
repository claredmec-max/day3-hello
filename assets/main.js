export function validateConsultForm({ name = '', phone = '' } = {}) {
  if (!name.trim()) {
    return { valid: false, error: 'name_required' };
  }

  const phonePattern = /^01[0-9]-\d{3,4}-\d{4}$/;
  if (!phonePattern.test(phone.trim())) {
    return { valid: false, error: 'phone_invalid' };
  }

  return { valid: true, error: null };
}

function getErrorMessage(errorCode) {
  const errorMessages = {
    name_required: '이름을 입력해주세요.',
    phone_invalid: '연락처 형식이 올바르지 않습니다. 예: 010-1234-5678'
  };

  return errorMessages[errorCode] ?? '입력 정보를 다시 확인해주세요.';
}

export async function submitLeadMock() {
  return { ok: true };
}

export function attachLandingPageHandlers({ submitLead = submitLeadMock } = {}) {
  const defaultFormSelector = '#consult-form';
  const form = document.querySelector(defaultFormSelector);
  const feedback = document.querySelector('#form-feedback');

  const safeQuerySelector = (selector) => {
    try {
      return document.querySelector(selector);
    } catch {
      return null;
    }
  };

  const ctas = document.querySelectorAll('[data-scroll-to-form]');
  ctas.forEach((cta) => {
    if (cta.dataset.boundScroll === 'true') {
      return;
    }

    cta.dataset.boundScroll = 'true';

    cta.addEventListener('click', (event) => {
      const targetSelector = cta.getAttribute('data-scroll-to-form')?.trim() || defaultFormSelector;
      const targetForm = safeQuerySelector(targetSelector) ?? safeQuerySelector(defaultFormSelector);

      if (!targetForm) {
        return;
      }

      event.preventDefault();
      targetForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

      const nameInput = targetForm.querySelector('#name');
      if (nameInput instanceof HTMLElement) {
        nameInput.focus();
      }
    });
  });

  if (!form || !feedback || form.dataset.bound === 'true') {
    return;
  }

  form.dataset.bound = 'true';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      message: String(formData.get('message') ?? '')
    };

    const validation = validateConsultForm(payload);
    if (!validation.valid) {
      feedback.textContent = getErrorMessage(validation.error);
      return;
    }

    try {
      const result = await submitLead(payload);
      if (!result?.ok) {
        throw new Error('submit_failed');
      }

      feedback.textContent = '상담 요청이 접수되었습니다. 빠르게 연락드릴게요.';
      form.reset();
    } catch {
      feedback.textContent = '요청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      attachLandingPageHandlers();
    });
  } else {
    attachLandingPageHandlers();
  }
}
