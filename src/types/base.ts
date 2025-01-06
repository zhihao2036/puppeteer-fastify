import { Static, Type } from "@sinclair/typebox";

export const BaseResponse = Type.Object({
  code: Type.Optional(Type.Number()),
  msg: Type.Optional(Type.String()),
  data: Type.Any(),
});

export type BaseResponseType = Static<typeof BaseResponse>;
