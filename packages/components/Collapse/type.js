export const collapseProps = {
  modelValue: {
    type: Array,
    default: () => [],
  },
  accordion: Boolean,
};

export const collapseItemProps = {
  name: {
    type: [String, Number],
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  disabled: Boolean,
};
