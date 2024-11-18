import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "@/lib/axios";

export const CreateChatroom = ({ openDialog, setOpenDialog }: { openDialog: boolean; setOpenDialog: (open: boolean) => void }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;
    mutate(name, {
      onSuccess: () => {
        setName("");
        setOpenDialog(false);
        toast({
          title: "Chatroom created",
          description: "You have successfully created a chatroom",
        });
        queryClient.invalidateQueries({ queryKey: ["chatrooms"] });
      },
      onError: (error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: async (name: string) => {
      const response = await api.post("/api/chatrooms", { name });
      return response.data;
    },
  });
  return (
    <Dialog
      open={openDialog}
      onOpenChange={setOpenDialog}
    >
      <DialogContent className="max-w-xs border border-gray-800 bg-foreground sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white">Create chatroom</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          method="post"
        >
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
                value={name}
                required
                autoFocus
                onChange={(e) => setName(e.target.value)}
                className="text-white border bg-secondary-foreground border-zinc-600"
                placeholder="Enter chatroom name"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
            >
              <span className="">Save</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
