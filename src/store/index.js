import { data } from "../data";
// import { data } from "../mockData";

export const initialState = data.data;
// export const initialState = data;

export function reducer(state, action) {
  switch (action.type) {
    case "drilldown":
      return { ...action.payload };
    default:
      throw new Error();
  }
}
