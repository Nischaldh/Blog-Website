export const signUpValidation = (name, email ,password) => {
  if (!name || !email || !password) {
    return {
      success: false,
      code: 400,
      message: "Please Provide all the values.",
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
 return {
      success: false,
      code: 400,
      message: "Please provide valid email address.",
    };
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
        success: false,
        code: 400,
        message:
          "Password must be at least 8 characters. Password must contains at least 1 uppercase letter, 1 lowercase letter and a speical character.",
      };
  }

  return {success:true}
};
