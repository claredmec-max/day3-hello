import { describe, it, expect } from 'vitest';
import { validateConsultForm } from '../assets/main.js';

describe('validateConsultForm', () => {
  it('이름이 공란이면 name_required를 반환한다', () => {
    const result = validateConsultForm({
      name: '   ',
      phone: '010-1234-5678',
      message: '상담 희망'
    });

    expect(result).toEqual({ valid: false, error: 'name_required' });
  });

  it('연락처 형식이 잘못되면 phone_invalid를 반환한다', () => {
    const result = validateConsultForm({
      name: '홍길동',
      phone: '01012345678',
      message: '상담 희망'
    });

    expect(result).toEqual({ valid: false, error: 'phone_invalid' });
  });

  it('정상 입력이면 valid true와 error null을 반환한다', () => {
    const result = validateConsultForm({
      name: '홍길동',
      phone: '010-1234-5678',
      message: '상담 희망'
    });

    expect(result).toEqual({ valid: true, error: null });
  });

  it('이름 앞뒤 공백은 trim 처리되어 정상으로 판단한다', () => {
    const result = validateConsultForm({
      name: '  홍길동  ',
      phone: '010-1234-5678',
      message: '상담 희망'
    });

    expect(result).toEqual({ valid: true, error: null });
  });
});
