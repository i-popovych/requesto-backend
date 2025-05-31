const encode = (data: string): string => Buffer.from(data).toString('base64');

const decode = (base64String: string): string =>
  Buffer.from(base64String, 'base64').toString('utf-8');

export default {
  decode,
  encode,
};
