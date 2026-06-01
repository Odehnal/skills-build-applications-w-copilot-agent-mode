import { app, PORT, baseUrl } from './server';

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
