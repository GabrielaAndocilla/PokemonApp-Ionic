import { RefObject, useEffect, useRef } from "react";

export const useEventListener = <
  WE extends keyof WindowEventMap,
  EE extends keyof ElementEventMap,
  T extends HTMLElement | void = void
>(
  eventName: WE|EE,
  callback: (event : WindowEventMap[WE]| ElementEventMap[EE] | Event) => void,
  element?: RefObject<T>
) => {

  const refCallback = useRef(callback)

  useEffect(()=> {
    refCallback.current = callback
  },[callback])

  useEffect(()=>{
   const targetElement : T | Window = element?.current || window
   if (!(targetElement && targetElement.addEventListener))
    return;
   const eventListener: typeof callback = (event) => refCallback.current(event);
   targetElement.addEventListener(eventName, eventListener);

  return () => {
    targetElement.removeEventListener(eventName, eventListener);
  };

  },[eventName,element])
};
