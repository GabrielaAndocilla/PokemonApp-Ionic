import { useCallback, useEffect, useState } from 'react';
import { useEventListener } from './useEventListener';

interface ElementSize {
  width:number,
  height:number
}

export const useElementSize = <T extends HTMLElement = HTMLDivElement>():([ (node: T | null) => void,  ElementSize, T|null]) => {

  const [ref,setRef] = useState<T | null>(null)
  const [size,setSize] = useState<ElementSize>({
    width:0,
    height:0
  })

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.offsetWidth || 0,
      height: ref?.offsetHeight || 0,
    })
  },[ref?.offsetHeight, ref?.offsetWidth])

  useEventListener('resize', handleSize)

  useEffect(() => {
    handleSize();
  }, [ref?.offsetHeight, ref?.offsetWidth]);


  return [setRef, size, ref]
};
