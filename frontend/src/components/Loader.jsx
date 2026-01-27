import { TailSpin } from "react-loader-spinner";

const Loader = ({ height, width , color}) => {
  return (
    <TailSpin
      visible={true}
      height={height}
      width={width}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
