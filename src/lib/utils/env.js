export default {
  isClient() {
    return process.env.VUE_ENV === 'client';
  },
  isServer() {
    return process.env.VUE_ENV === 'server';
  },
  value() {
    return process.env.VUE_ENV;
  }
};
