function getCors() {
  const origin = [];
  let originCount = 1;

  while (process.env[`CLIENT_URL_${originCount}`]) {
    origin.push(process.env[`CLIENT_URL_${originCount}`]);
    originCount++;
  }

  if (
    process.env.NODE_ENV &&
    process.env.NODE_ENV.startsWith('dev') &&
    !origin.length
  ) {
    origin.push('*');
  }
  return {
    origin,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
}

export default getCors;
