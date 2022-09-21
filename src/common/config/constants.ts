/**
 *
 * Tokens
 *
 */
export const ACCESS_TOKEN_NAME = 'access_token';
export const REFRESH_TOKEN_NAME = 'refresh_token';
export const ACCESS_TOKEN_IS_NOT_SET = 'Access token is not set';
export const REFRESH_TOKEN_IS_NOT_SET = 'Refresh token is not set';
export const REFRESH_TOKEN_IS_NOT_VALID = 'Refresh token is not valid';

/**
 *
 * Messages
 *
 */
export const SUCCESSFUL_REGISTER = 'Вы успешно зарегистрировались в системе';
export const USER_FOUND = 'Пользователь найден';
export const SUCCESSFUL_UPDATE = 'Данные обновлены';
export const SUCCESSFUL_USER_DELETE = 'Аккаунт удален!';
export const SUCCESSFUL_AUTHORIZATION = 'Вы успешно авторизовались в системе';

/**
 *
 * Exceptions
 *
 */
export const USER_NOT_FOUND = 'Пользователь не найден';
export const USER_ALREADY_EXISTS = 'Пользователь с таким адресом уже есть в системе';
export const USERNAME_EXIST = 'Nickname {username} занят';

export const TAG_EXIST = "Тэг с таким название уже существует";
export const TAG_CREATED = "Тэг создан";
export const TAG_FOUNDED = "Тэг найден";
export const TAG_DELETED = "Тэг успешно удален";
export const USER_TAG_DELETED = "Тэг откреплен от пользователя";
export const USER_TAG_ADDED = "Тэг прикреплен к пользователю";
export const TAG_DATA_UPDATED = "Тэг успешно обновлён";
export const TAG_NOT_EXIST = "Тэг не существует";
export const TAG_WITH_ID_NOT_EXIST = "Тэг с таким id не сущетсвует";
export const TAG_EDIT_NOT_ACCESS = "Вы не можете редактировать этот тэг";
export const TAG_DELETE_NOT_ACCESS = "Вы не можете удалить этот тэг";

export const EMAIL_IS_BUSY = "Этот email-адрес занят";
export const NICKNAME_IS_BUSY = "Этот nickname занят";

export const AUTHORIZATION_EXCEPTION = 'Не верный логин или пароль';
export const UNAUTHORIZED_EXCEPTION = 'Авторизуйтесь в системе для доступа к функции';

/**
 *
 * Repository providers
 *
 */
export const USER_REPOSITORY = 'UserRepo';
export const TOKEN_REPOSITORY = 'TokenRepo';
export const TAG_REPOSITORY = 'TagRepo';

/**
 *
 * Service providers
 *
 */
export const USER_SERVICE = 'UserService';
export const AUTH_SERVICE = 'AuthService';
export const TOKEN_SERVICE = 'TokenService';
export const TAG_SERVICE = 'TagService';