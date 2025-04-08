import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, headers } = req;
    const start = Date.now();

    this.logger.log(`Solicitud entrante: ${method} ${originalUrl}`);
    //this.logger.log(`Cabeceras de la solicitud: ${JSON.stringify(headers)}`); // Imprimir las cabeceras de la solicitud
    this.logger.log(`Cuerpo de la solicitud: ${JSON.stringify(body)}`); // Imprimir el cuerpo de la solicitud

    res.on('finish', () => {
      const { statusCode } = res;
      const delay = Date.now() - start;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - ${delay}ms`,
        'RequestLogger',
      );
    });

    next();
  }
}
