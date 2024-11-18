import { createAvatar } from "@dicebear/core";
import { dylan, rings } from "@dicebear/collection";

const Avatar = ({ seed, type }: { seed: string; type: string }) => {
  const avatar = createAvatar(type === "rings" ? rings : dylan, { seed, size: 64 });
  return (
    <img
      src={avatar.toDataUri()}
      alt="Avatar"
      className="w-10 h-10 rounded-full"
    />
  );
};

export default Avatar;
