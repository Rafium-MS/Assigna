import { contextBridge } from 'electron';

import { designacoes } from './preload/designacoes';
import { territorios } from './preload/territorios';
import { saidas } from './preload/saidas';
import { app } from './preload/app';
import { pdf } from './preload/pdf';

contextBridge.exposeInMainWorld('api', {
  designacoes,
  territorios,
  saidas,
  app,
  pdf,
});

