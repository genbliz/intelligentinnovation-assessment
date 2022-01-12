import bunyan from 'bunyan';
import { envConfig } from '../config/env';

const streams: any[] = [];
const name = `MAX-XXXX-SERVICE-${envConfig.environment || ''}`;

if (envConfig.environment === 'production') {
  streams.push({
    stream: process.stdout,
    level: 'debug'
  });
} else {
  streams.push({
    stream: process.stdout,
    level: 'debug'
  });
}

export const LoggingService = bunyan.createLogger({
  name,
  streams,
  serializers: bunyan.stdSerializers
});
