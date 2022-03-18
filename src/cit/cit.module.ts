import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Cit, CitSchema } from "@/cit/schemas/cit.schema";
import { CitController } from "@/cit/cit.controller";
import { CitService } from "@/cit/cit.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Cit.name, schema: CitSchema }])],
  controllers: [CitController],
  providers: [CitService],
  exports: [CitService],
})
export class CitModule {}
