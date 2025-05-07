import Icon from '@mdi/react';
import { mdiHomeCircle } from '@mdi/js';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-slate-300 flex justify-around h-10 items-center">
      <div>
        <Icon path={mdiHomeCircle} size={1}></Icon>
      </div>
      <div className="flex gap-6">
        <Link href='/properties'>Properties</Link>
        <Link href='/'>Terms of Service</Link>
      </div>
      <div>
       <p className="text-slate-100">&copy; 2025 Property Pulse. All rights reserved.</p>
      </div>
    </footer>
  )
}