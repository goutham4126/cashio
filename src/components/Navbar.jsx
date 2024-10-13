import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Dialog} from "@/components/ui/dialog";
import TransForm from './TransForm';
import { checkUser } from '@/lib/checkUser';

const Navbar = async () => {
  const user = await checkUser();
  return (
    <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-9">
      <div>
        <h1 className="text-lg md:text-2xl font-semibold" style={{color:"hsl(var(--chart-4))"}}>
          Cashio<span style={{color:"hsl(var(--chart-2))"}}> {user?.name}</span>
        </h1>
      </div>
      <div className="flex gap-6 md:gap-16 items-center">
        {
          user &&
          <Dialog>
            <TransForm />
          </Dialog>
        }
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
