import type { Document } from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {CreateBizTypeDto} from "@/biz-type/dto/create-biz-type.dto";

@Schema({
    timestamps: true
})
export class BizType {
    @Prop({
        type: String,
        index: true
    })
    name: string

    @Prop({
        type: String
    })
    displayName: string

    @Prop({
        type: Boolean
    })
    system: boolean

    @Prop({
        type: String
    })
    desc: string
/*
    constructor(bizType: CreateBizTypeDto) {
        this.name = bizType.name
        this.displayName = bizType.displayName
        this.system = bizType.system
        this.desc = bizType.desc
    }
*/
}

export type BizTypeDocument = BizType & Document
export const BizTypeSchema = SchemaFactory.createForClass(BizType)