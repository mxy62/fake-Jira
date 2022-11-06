import { useState } from "react";
type Stat = "idle" | "loading" | "error" | "success";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: Stat;
}
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};
export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...initialState,
    ...defaultInitialState,
  });

  const setData = (data: D) => {
    setState({
      data,
      error: null,
      stat: "success",
    });
  };
  const setError = (error: Error) => {
    setState({
      error,
      data: null,
      stat: "error",
    });
  };
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({
      ...state,
      stat: "loading",
    });
    promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
