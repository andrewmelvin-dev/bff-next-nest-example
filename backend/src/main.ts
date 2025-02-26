import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cluster from 'cluster';
import { cpus } from 'os';

async function bootstrap() {
  if (cluster.isPrimary) {
    // Create a worker for each CPU core
    const numCPUs = cpus().length;
    console.log(`Master process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share the same server port
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
    console.log(`Worker process ${process.pid} has started`);
  }
}
bootstrap();
