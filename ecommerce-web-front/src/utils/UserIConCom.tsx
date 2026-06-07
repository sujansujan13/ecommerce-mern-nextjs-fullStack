import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarArrowDown, Heart, LogOut, Trophy, User } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

interface User {
  name: string;
  email: string;
  phone: string;
}

interface UserIconProps {
  onClick: () => void;
}

export default function UserIConCom({ onClick }: UserIconProps) {
  const { user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" aria-label="Profile">
          <User
            className="stroke-[#4b5563]"
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuGroup>
          <div className="px-4 py-2 border-b">
            <p className="font-semibold">{user?.name}</p>

            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="border-b space-y-2 p-4">
            <DropdownMenuItem className="flex items-center gap-3">
              <User />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3">
              <CalendarArrowDown />
              My Orders
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3">
              <Heart />
              WishList
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3">
              <Trophy />
              My Achievements
            </DropdownMenuItem>
          </div>
          <DropdownMenuItem onClick={onClick} className="p-5">
            <LogOut />
            logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
