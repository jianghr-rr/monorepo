import Navbar from './nav-bar';
import User from './user';

export default function HomeNav() {
  return (
    <div className="text-secondary-foreground fixed inset-x-0 top-0 flex">
      <div className="flex-0 p-2 text-start">
        <Navbar />
      </div>
      <div className="flex flex-1 justify-end p-2 align-middle">
        <div className="inline-flex items-center">
          <User />
        </div>
      </div>
    </div>
  );
}
