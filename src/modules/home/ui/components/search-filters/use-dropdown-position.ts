import { RefObject } from "react";

const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Width of dropdown (w-60 = 15rem = 240px)

    // Calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdown would go off the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      left = rect.right + window.scrollX - dropdownWidth;

      // If still off-screen, align to the left edge of the viewport with some padding
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16; // 16px padding
      }

      if (left < 0) {
        left = 16
      }

      return { top, left };
    }

    return { top, left };
  }

  return { getDropdownPosition }
}

export default useDropdownPosition;