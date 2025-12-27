// src/hooks/useFloatingTooltip.ts
import { useCallback, useState } from "react";
import { ToolTip } from "@/types";

const INITIAL_TOOLTIP: ToolTip = {
  visible: false,
  x: 0,
  y: 0,
  translation: "",
  color: "#000",
};

export function useFloatingTooltip() {
  const [tooltip, setTooltip] = useState<ToolTip>(INITIAL_TOOLTIP);

  const showTooltip = useCallback((data: ToolTip) => {
    setTooltip({
      ...data,
      visible: true,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip(prev =>
      prev.visible ? { ...prev, visible: false } : prev
    );
  }, []);

  return {
    tooltip,
    showTooltip,
    hideTooltip,
  };
}