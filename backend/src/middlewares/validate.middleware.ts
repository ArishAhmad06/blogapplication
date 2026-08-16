import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validate =
  (Schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = Schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    req.body = result.data;
    next();
  };
