export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    login: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      loading: 'Загрузка...',
      noAccount: 'Нет аккаунта?',
      signupLink: 'Регистрация',
      errors: {
        authFailed: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      loading: 'Регистрация...',
      hasAccount: 'Уже есть аккаунт?',
      loginLink: 'Войти',
      errors: {
        required: 'Обязательное поле',
        usernameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordsMatch: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
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
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
      newMessage: 'Новое сообщение',
    },
    modals: {
      addChannel: {
        title: 'Добавить канал',
        placeholder: 'Имя канала',
        submit: 'Создать',
        loading: 'Создание...',
        errors: {
          badWords: 'Недопустимое название',
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
      network: 'Ошибка соединения с сервером',
      fallback: {
        title: 'Упс, что-то пошло не так.',
        message: 'Мы уже уведомлены и работаем над исправлением.',
      },
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
