import { Module } from '@nestjs/common';
import { OrgsController } from './orgs.controller';
import { OrgsService } from './orgs.service';
import { DbService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [OrgsController],
  providers: [OrgsService, DbService],
  imports: [DbModule]
})
export class OrgsModule {}
