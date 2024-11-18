export const withUIHandler = async (fn: () => Promise<void>, setLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
  setLoading(true);
  setError(null);
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) setError(error.message || "An unexpected error occurred");
    throw error;
  } finally {
    setLoading(false);
  }
};
