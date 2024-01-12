import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { OrgsModule } from './orgs/orgs.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [AuthModule, DbModule, OrgsModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
