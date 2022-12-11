export const protect = async (req: any, res: any, next: any) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};
