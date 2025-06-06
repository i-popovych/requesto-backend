export const regex = {
  email: {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email is incorrect',
  },
  password: {
    pattern: /^(?=.*[A-Za-z0-9!@#$&()\\-`.+,\/"])[\w\W]{6,}$/,
    message: 'Password must be at least 6 characters long.',
  },
  url: {
    pattern:
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    message: 'Invalid URL',
  },
  phone: {
    pattern: /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/,
    message: 'Phone number is incorrect',
  },
  fullName: {
    pattern: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    message: 'Full name is incorrect',
  },
  apiKey: {
    pattern: /^\S+$/,
    message: 'API key should not be empty or contain only spaces',
  },
};
