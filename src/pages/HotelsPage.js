import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/user";
import { useHttp } from "../hooks/useHttp";

export function HotelsPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const fetchProfileData = useCallback(async () => {
    try {
      const fetched = await request(
        `http://engine.hotellook.com/api/v2/lookup.json`,
        "GET",
        null
      );
      console.log("GET data: ", fetched);
    } catch (e) {
      console.log("ERROR GET data: ", e);
    }
  }, [request]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return (
    <div>
      <div>{user.email}</div>
      <button aria-label="Log-Out" onClick={() => dispatch(logOut())}>
        logOut
      </button>
    </div>
  );
}
