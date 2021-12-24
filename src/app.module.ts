import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { ExampleItemModule } from './example-item/example-item.module';
import config from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ExampleModule,
    ExampleItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
