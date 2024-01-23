//import { describe, expect, it } from "vitest";
import { checkObjectId } from "./helper";

describe("Helper tests",()=>{
    it("checkobjecId() is invailed",()=>{
        expect(()=>checkObjectId('invailedobjectId')).toThrow()
    })
    it('checkObjectId() is true',()=>{
        expect(checkObjectId('65869b57fb0b3757a6c4608f')).toBeTruthy()
    })
})