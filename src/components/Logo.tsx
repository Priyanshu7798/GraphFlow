import { cn } from '@/lib/utils';
import { SquareDashedMousePointer } from 'lucide-react';

function Logo({fontSize = "text-2xl", iconSize = 20}:{fontSize? : string; iconSize? : number;}) {
  return (
    <div
      className={cn("text-2xl font-extrabold flex items-center gap-2"
      )} 
    >
      <div className='rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2'>
        <SquareDashedMousePointer size={iconSize} className='stroke-white' />
      </div>
      <div>
        <span className='bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent'>
          Graph
        </span>
        <span className='text-stone-700'>
          Flow
        </span>
      </div>
    </div>
  )
}

export default Logo 