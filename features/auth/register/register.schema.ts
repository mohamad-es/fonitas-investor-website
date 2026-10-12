import { z } from "zod";

export function createRegisterSchema(t: (key: string) => string) {
  return z.object({
    display_name: z
      .string()
      .trim()
      .min(2, t("auth_validationNameMin"))
      .max(100, t("auth_validationNameMax")),
    email: z.string().trim().email(t("auth_validationEmail")).max(254),
    password: z
      .string()
      .min(8, t("auth_validationPasswordMin"))
      .max(128, t("auth_validationPasswordMax")),
  });
}

export type RegisterFormValues = z.infer<ReturnType<typeof createRegisterSchema>>;
export type RegisterRequest = {
  tenant_slug: "fonitas";
  display_name: string;
  email: string;
  password: string;
};

export type RegisterUser = {
  public_id: string;
  display_name: string;
  status: string;
  primary_email: {
    email: string;
    is_verified: boolean;
    verified_at: string | null;
  };
  tenant_public_id: string;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
  roles: string[];
  permissions: string[];
};

export type RegisterResponse = {
  data: RegisterUser;
  meta: Record<string, unknown>;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  request_id?: string;
};
