import { wrapApiHandlerWithSentry } from '@sentry/nextjs';

const doAsyncWork = () => Promise.reject(new Error('API Test 1'));
doAsyncWork();

async function handler(req: any, res: any) {
  res.status(200).json({ name: 'John Doe' });
}

export default wrapApiHandlerWithSentry(handler, "/api/test");
