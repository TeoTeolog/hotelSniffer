import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../redux/user";

export function AuthPage() {
  const count = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <span>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Increment by value value"
          onClick={() => dispatch(incrementByAmount(22))}
        >
          increment by 22
        </button>
      </div>
    </div>
  );
}
