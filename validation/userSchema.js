const { z } = require("zod");

const userSchema = z.object({
  name: z
    .string()
    .min(3, "Ime mora imati bar 3 slova")
    .regex(/^[A-Za-z]+$/, "Ime smije sadržavati samo slova"),

  password: z
    .string()
    .min(6, "Password mora imati bar 6 karaktera")
});

module.exports = userSchema;