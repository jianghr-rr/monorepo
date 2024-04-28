import { Github } from 'lucide-react';
import { Button } from 'ui/button';

export default function HomeNav() {
  return (
    <div className="fixed inset-x-0 top-0 flex h-10 text-secondary-foreground">
      <div className="flex-1 p-2 text-start">think</div>
      <div className="flex-1 p-2 text-end">
        <div className="inline-flex items-center">
          <Button variant="ghost" size="icon">
            <Github />
          </Button>
        </div>
      </div>
    </div>
  );
}
