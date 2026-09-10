export const REQUIRED_FIELD = 'Обязательное поле';
export const WRONG_FULL_NAME = 'Некорректное ФИО';
export const WRONG_COMPANY = 'Некорректное название места работы';
export const WRONG_POSITION = 'Некорректное название специальности';
export const WRONG_PHONE = 'Некорректный номер телефона';
export const WRONG_ADDRESS = 'Некорректный адрес';
export const WRONG_EMPLOYEES = 'Некорректное количество сотрудников';
export const WRONG_EMAIL = 'Некорректный email';
export const WRONG_NUMBER = 'Некорректное число';
export const PARTICIPANT_NUMBER =
  'Количество участников должно быть от 1 до 15';
export const PASSWORD_MIN_NUMBER = 'Пароль должен иметь не менее 6 символов';
export const EMAIL_CONDITION =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;
export const FIELD_CONDITION = /^(?=.*[a-z]|[а-я])([a-z]|[а-я]){2,}$/i;
export const PHONE_CONDITION =
  /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm;
export const NUMBER_CONDITION = /^[0-9]*[1-9][0-9]*$/;
export const PARTICIPANTS_CONDITION = /^[0-9]*[1-9][0-9]*$/;

export const fullNameValidation = {
  required: REQUIRED_FIELD,
};

export const companyValidation = {
  required: REQUIRED_FIELD,
};

export const positionValidation = {
  required: REQUIRED_FIELD,
};

export const phoneValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(PHONE_CONDITION)) {
      return WRONG_PHONE;
    }

    return true;
  },
};

export const emailValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(EMAIL_CONDITION)) {
      return WRONG_EMAIL;
    }

    return true;
  },
};

export const addressValidation = {
  required: REQUIRED_FIELD,
};

export const employeesValidation = {
  required: REQUIRED_FIELD,
};

export const dateValidation = {
  required: REQUIRED_FIELD,
};

export const numberValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(NUMBER_CONDITION)) {
      return WRONG_NUMBER;
    }

    return true;
  },
};

export const participantsValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(PARTICIPANTS_CONDITION)) {
      return WRONG_NUMBER;
    }
    if (+value > 15) {
      return PARTICIPANT_NUMBER;
    }

    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.trim().length < 6) {
      return PASSWORD_MIN_NUMBER;
    }

    return true;
  },
};
