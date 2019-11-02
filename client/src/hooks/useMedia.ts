import { useState, useEffect } from "react";

export type Query<T> = [string, T];

export default function useMedia<T>(defaultValue: T, ...queries: Query<T>[]) {
  const mediaQueryLists = queries.map(([queryStr]) =>
    window.matchMedia(queryStr)
  );

  const getValue = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    if (index >= queries.length || index < 0) {
      return defaultValue;
    } else {
      return queries[index][1];
    }
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  }, []);

  return value;
}
