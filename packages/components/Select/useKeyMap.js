export default function useKeyMap({
  isDropdownVisible,
  controlVisible,
  selectStates,
  highlightedLine,
  handleSelect,
  hasData,
  lastIndex,
}) {
  const keyMap = new Map();

  keyMap.set("Enter", () => {
    if (!isDropdownVisible.value) {
      controlVisible(true);
    } else {
      if (selectStates.highlightedIndex >= 0 && highlightedLine.value) {
        handleSelect(highlightedLine.value);
      } else {
        controlVisible(false);
      }
    }
  });

  keyMap.set("Escape", () => {
    isDropdownVisible.value && controlVisible(false);
  });

  keyMap.set("ArrowUp", (e) => {
    e.preventDefault();
    if (!hasData.value) return;
    if (
      selectStates.highlightedIndex === -1 ||
      selectStates.highlightedIndex === 0
    ) {
      selectStates.highlightedIndex = lastIndex.value;
      return;
    }
    selectStates.highlightedIndex--;
  });

  keyMap.set("ArrowDown", (e) => {
    e.preventDefault();
    if (!hasData.value) return;
    if (
      selectStates.highlightedIndex === -1 ||
      selectStates.highlightedIndex === lastIndex.value
    ) {
      selectStates.highlightedIndex = 0;
      return;
    }
    selectStates.highlightedIndex++;
  });

  return keyMap;
}
