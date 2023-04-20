// import { useEffect, useState } from "react";

// export default function useQueryFormater(params) {
//   const [queryString, setQueryString] = useState("");

//   useEffect(() => {
//     const formattedParams = Object.entries(params)
//       .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
//       .join("&");
//     setQueryString(`?${formattedParams}`);
//   }, [params]);

//   return queryString;
// }

import { useCallback } from "react";

export default function useQueryFormater() {
  const toQueryStringData = useCallback(async (params) => {
    const formattedParams = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return `?${formattedParams}`;
  }, []);

  return { toQueryStringData };
}
