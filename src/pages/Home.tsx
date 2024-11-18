import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import { api } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/Loader";
import { Error } from "@/components/Error";
const HomePage = () => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRandomName = () => {
    const randomName = faker.person.firstName();
    setName(randomName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return setError("Oops! Name is required");
    if (error && name) setError("");
    try {
      setLoading(true);
      const response = await api.post("/api/users", {
        user: {
          name,
        },
      });
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/chatroom");
    } catch (error) {
      setError("Oops! Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-br from-foreground via-purple-900 to-foreground">
      <Error
        error={error}
        icon={<TriangleAlert />}
      />
      <div className="z-50 px-5 py-16 space-y-6 text-center border bg-gray-900/50 border-zinc-800 rounded-3xl md:px-10">
        <h1 className="text-4xl font-extrabold md:text-5xl ">Let's Get Started</h1>
        <p className="text-lg opacity-80 ">Enter your name to begin the journey!</p>
        <form
          onSubmit={handleSubmit}
          method="post"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative flex items-center w-full max-w-sm bg-background rounded-2xl">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full py-6 font-bold bg-transparent border-none text-primary "
              />
              <Button
                type="button"
                size="icon"
                onClick={handleRandomName}
                className="absolute right-2"
              >
                <Shuffle />
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full max-w-sm py-6 bg-primary hover:bg-primary/90"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
      <Loader isVisible={loading} />
    </div>
  );
};

export default HomePage;
