export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    login: {
      title: 'Войти',
      username: 'Имя пользователя',
      password: 'Пароль',
      submit: 'Войти',
      loading: 'Загрузка...',
      noAccount: 'Нет аккаунта?',
      signupLink: 'Регистрация',
      errors: {
        required: 'Обязательное поле',
        authFailed: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтверждение пароля',
      submit: 'Зарегистрироваться',
      loading: 'Регистрация...',
      hasAccount: 'Уже есть аккаунт?',
      loginLink: 'Войти',
      errors: {
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordsMatch: 'Пароли должны совпадать',
        required: 'Обязательное поле',
        userExists: 'Пользователь с таким именем уже существует',
      },
    },
    chat: {
      channels: 'Каналы',
      addChannel: 'Добавить канал',
      rename: 'Переименовать',
      remove: 'Удалить',
      inputPlaceholder: 'Введите сообщение...',
      send: 'Отправить',
      sending: 'Отправка...',
      messages: 'Нет сообщений',
    },
    modals: {
      addChannel: {
        title: 'Добавить канал',
        placeholder: 'Имя канала',
        submit: 'Создать',
        loading: 'Создание...',
        errors: {
          length: 'От 3 до 20 символов',
          exists: 'Канал уже существует',
          required: 'Обязательное поле',
        },
      },
      renameChannel: {
        title: 'Переименовать канал',
        submit: 'Сохранить',
        loading: 'Сохранение...',
      },
      removeChannel: {
        title: 'Удалить канал',
        confirm: 'Уверены что хотите удалить канал',
        cancel: 'Отмена',
        submit: 'Удалить',
      },
    },
    notFound: {
      title: '404',
      message: 'Страница не найдена',
    },
    errors: {
      channels: {
        load: 'Ошибка загрузки каналов',
        create: 'Ошибка создания канала',
        remove: 'Ошибка удаления канала',
        rename: 'Ошибка переименования',
      },
      messages: {
        load: 'Ошибка загрузки сообщений',
        send: 'Ошибка отправки сообщения',
      },
    },
    toasts: {
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удалён',
      networkError: 'Ошибка соединения',
      dataError: 'Ошибка загрузки данных',
    },
  },
}
