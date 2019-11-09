// Note: Any HTML in `content` is not escaped
const useTooltip = (content: string) => {
  return {
    "data-tip-trigger": true,
    "data-tip": content
  };
};

export default useTooltip;
