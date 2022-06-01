import React from "react";

export function useDocumentTitle(title: string) {
  const prevTitleRef = React.useRef(document.title);
  React.useLayoutEffect(() => {
    let prevTitle = prevTitleRef.current;
    document.title = title;
    return function () {
      document.title = prevTitle;
    };
  }, [title]);
}
