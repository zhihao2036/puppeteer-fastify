import { Static, Type } from "@sinclair/typebox";

export const Screenshot = Type.Object({
  url: Type.String(),
});

export type ScreenshotType = Static<typeof Screenshot>;
