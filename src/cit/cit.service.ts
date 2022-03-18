import type { PageQuery} from "@/interfaces/PageQuery";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Cit, CitDocument} from "@/cit/schemas/cit.schema";
import { CreateCitDto} from "@/cit/dto/create-cit.dto";


@Injectable()
export class CitService {
    constructor(
        @InjectModel(Cit.name) private readonly citModel: Model<CitDocument>
    ) {
    }

    async create(body: CreateCitDto): Promise<Cit> {
        return this.citModel.create(new Cit(body))
    }
}
