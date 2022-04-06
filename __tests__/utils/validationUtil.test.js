import {
  includeBlankFirstAndLast,
  validateName,
  composeValidateName,
  validatePhoneNumber,
  validateFullRegNo,
  composeValidFunc,
  validateMobilePhoneNumber,
} from '../../src/utils/validationUtil';

describe('includeBlankFirstOrLast()', () => {
  it('값이 공백일 경우 false를 리턴한다', () => {
    expect(includeBlankFirstAndLast('')).toBe(false);

    expect(includeBlankFirstAndLast(' ')).toBe(false);
  });

  it('맨 앞 또는 맨 뒤에 공백이 존재할경우 false를 리턴한다', () => {
    expect(includeBlankFirstAndLast(' 김원원')).toBe(false);

    expect(includeBlankFirstAndLast('김원원 ')).toBe(false);

    expect(includeBlankFirstAndLast(' 김원원 ')).toBe(false);
  });
});

describe('validateName() /* 이름 유효성 검증 */', () => {
  it('한글, 영어, 공백만 입력 가능해야 한다.', () => {
    expect(validateName('김원원')).toBe(true);

    expect(validateName('Kim원원')).toBe(true);

    expect(validateName('KimDotOne')).toBe(true);

    expect(validateName('Kim 원 One')).toBe(true);

    expect(validateName('김.1')).toBe(false);
  });

  it('50자 이하여야 한다', () => {
    expect(validateName('김김김김김김김김김김')).toBe(true);

    const longName = Array(51)
      .fill('김')
      .reduce((prev, cur) => `${prev + cur}`);

    expect(longName.length).toBeGreaterThan(50);

    expect(validateName(longName)).toBe(false);
  });
});

describe('composeValidateName() 이름검증 합성함수', () => {
  it('함수 정상 실행 확인', () => {
    const compose = composeValidFunc(includeBlankFirstAndLast, validateName);

    expect(compose('')).toBe(false);
    expect(compose(' ')).toBe(false);
    expect(compose(' 김원원')).toBe(false);
    expect(compose('김원원 ')).toBe(false);
    expect(compose(' 김원원 ')).toBe(false);
    const longName = Array(51)
      .fill('김')
      .reduce((prev, cur) => `${prev + cur}`);
    expect(compose(longName)).toBe(false);

    expect(compose('김원원')).toBe(true);
    expect(compose('김 원 원')).toBe(true);
  });
});

describe('validatePhoneNumber() /* 전화번호(휴대폰 번호 포함) 유효성 검증 */', () => {
  it('숫자로 구성된 문자만 입력 가능하다.', () => {
    expect(validatePhoneNumber('01012345678')).toBe(true);

    expect(validatePhoneNumber('010-1234-5678')).toBe(false);
  });
});

describe('validateMobileNumber()', () => {
  it('휴대폰 번호 형식에 맞아야 한다.', () => {
    expect(validateMobilePhoneNumber('01022229999')).toBe(true);

    expect(validateMobilePhoneNumber('024449999')).toBe(false);

    expect(validateMobilePhoneNumber('0321234567')).toBe(false);
  });
});

describe('validateFullRegNo() /* 전체 주민등록번호 유효성 검증 */', () => {
  const validNumGenerator = (regNo) => {
    const regNums = regNo.slice(0, 12).split('');
    let validMultiples = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sumMultiple = 0;

    for (let key in regNums) {
      sumMultiple += parseInt(regNums[key]) * validMultiples[key];
    }

    let validFlag = 11;
    let foreignerValidFlag = parseInt(regNums[6]);

    const isForeigner = [5, 6, 7, 8].includes(foreignerValidFlag);
    if (isForeigner) validFlag = 13;

    let validNum = validFlag - (sumMultiple % 11);
    if (validNum >= 10) validNum %= 10;
    return validNum;
  };

  it('숫자로 구성된 문자만 입력 가능하다.', () => {
    expect(
      validateFullRegNo(`110101112233${validNumGenerator('110101112233')}`),
    ).toBe(true);

    expect(validateFullRegNo(`110101-112236`)).toBe(false);
  });

  it('외국인 주민등록 번호도 입력 가능하다.', () => {
    expect(
      validateFullRegNo(`120101512233${validNumGenerator('120101512233')}`),
    ).toBe(true);
  });
});
