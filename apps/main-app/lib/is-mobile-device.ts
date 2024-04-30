/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server';

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

export const isMobileDevice = (): Promise<boolean> => {
  if (typeof process === 'undefined') {
    throw new Error(
      '[Server method] you are importing a server-only module outside of server'
    );
  }

  const ua = headers().get('user-agent');
  const device = new UAParser(ua ?? '').getDevice();
  return new Promise((resolve) => resolve(device.type === 'mobile'));
};
